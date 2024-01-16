/******************************************************************************
 * @file    hyt939.c
 * @author  Polytech GE
 * @version V0.1
 * @date    21/09/2022
 * @brief   manages the sensors on the application

 */

/* Includes ------------------------------------------------------------------*/

#include "hyt939.h"
#include "timeServer.h"
#include "bsp.h"

/* Private typedef -----------------------------------------------------------*/
/* Private define ------------------------------------------------------------*/

/* Private macro -------------------------------------------------------------*/
/* Private variables ---------------------------------------------------------*/
/* Private function prototypes -----------------------------------------------*/
/* Exported functions ---------------------------------------------------------*/

/* Private variables ---------------------------------------------------------*/
/* I2C handler declaration */

extern bool hyt939_status;
static uint8_t rxdatas[4];
extern uint8_t nsensor;
extern sensor_t sensor_data;
I2C_HandleTypeDef I2cHandle40;
/* I2C TIMING Register define when I2C clock source is SYSCLK */
/* I2C TIMING is calculated in case of the I2C Clock source is the SYSCLK = 32 MHz */
#define I2C_TIMING 0x10A13E56 /* 100 kHz with analog Filter ON, Rise Time 400ns, Fall Time 100ns */
//#define I2C_TIMING      0x00B1112E /* 400 kHz with analog Filter ON, Rise Time 250ns, Fall Time 100ns */
/* Private typedef -----------------------------------------------------------*/
/* Private define ------------------------------------------------------------*/

/* Private macro -------------------------------------------------------------*/
/* Private variables ---------------------------------------------------------*/
/* Private function prototypes -----------------------------------------------*/
/* Exported functions ---------------------------------------------------------*/

/* Private variables ---------------------------------------------------------*/
void BSP_hyt939_Init(void)
{
	/*##-1- Configure the I2C peripheral ######################################*/
	I2cHandle40.Instance = I2Cx;
	I2cHandle40.Init.Timing = I2C_TIMING;
	I2cHandle40.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
	I2cHandle40.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
	I2cHandle40.Init.OwnAddress2Masks = I2C_OA2_NOMASK;
	I2cHandle40.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
	I2cHandle40.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
	I2cHandle40.Init.OwnAddress1 = 0xF0;
	I2cHandle40.Init.OwnAddress2 = 0xFE;

	if (HAL_I2C_Init(&I2cHandle40) != HAL_OK)
	{
		/* Initialization Error */
		PPRINTF("Error: HYT939 I2C bus Init failure\r\n");
		Error_Handler();
	}
	if (HAL_I2C_Init(&I2cHandle40) == HAL_OK)
	{
		PPRINTF("\r\nHYT939 I2C bus Init success\r\n");
	}
	
	/* Enable the Analog I2C Filter */
	HAL_I2CEx_ConfigAnalogFilter(&I2cHandle40, I2C_ANALOGFILTER_ENABLE);
	/* Infinite loop */
}


void GPIO_HYT_OUTPUT_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct={0};
	
	GPIO_InitStruct.Pin = GPIO_PIN_10;
  GPIO_InitStruct.Mode  = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull  = GPIO_PULLUP;
  GPIO_InitStruct.Speed = GPIO_SPEED_HIGH;

  HW_GPIO_Init( GPIOA, GPIO_PIN_10, &GPIO_InitStruct );
}


void GPIO_HYT_OUTPUT_DeInit(void)
{
	GPIO_InitTypeDef GPIO_InitStruct={0};

  GPIO_InitStruct.Pin = GPIO_PIN_10 ;
	GPIO_InitStruct.Mode  = GPIO_MODE_ANALOG;
	GPIO_InitStruct.Pull  = GPIO_NOPULL;
	
  HW_GPIO_Init( GPIOA, GPIO_PIN_10, &GPIO_InitStruct );	
}







void HYT939_MR(uint8_t adrr)
{
	uint8_t txdata[1] = {0x80};
	uint32_t currentTime = TimerGetCurrentTime();
	while (HAL_I2C_Master_Transmit(&I2cHandle40, adrr, txdata, 1, 1000) != HAL_OK)
	{
		if (TimerGetElapsedTime(currentTime) >= 500)
		{
			hyt939_status = 0;
			PRINTF("Measurement request failure\r\n");
			break;
		}
		if (HAL_I2C_GetError(&I2cHandle40) != HAL_I2C_ERROR_AF)
		{
		}
	}
	if (HAL_I2C_Master_Transmit(&I2cHandle40, adrr, txdata, 1, 1000) == HAL_OK)
	{
		hyt939_status = 1;
		PRINTF("Measurement request success\r\n");
	}
}

void HYT939_DF(uint8_t adrr, uint8_t rxdata[])
{
	uint32_t currentTime = TimerGetCurrentTime();
	
	while (HAL_I2C_Master_Receive(&I2cHandle40, adrr + 1, rxdata, 4, 6000) != HAL_OK)
	{
		
		if (TimerGetElapsedTime(currentTime) >= 4000)
		{
			hyt939_status = 0;
			PRINTF("Data fetch failure\r\n");
			break;
		}
		if (HAL_I2C_GetError(&I2cHandle40) != HAL_I2C_ERROR_AF)
		{
		}
	}
	if (HAL_I2C_Master_Receive(&I2cHandle40, adrr + 1, rxdata, 4, 6000) == HAL_OK)
	{
		hyt939_status = 1;
		PPRINTF("Data fetch success\r\n");
	}
}

void tran_HYT939data(hyt_sensor *sens)
{
	for (int i = 0; i < 4; i++)
	{
		rxdatas[i] = 0x00;
	}
	PRINTF("Address : 0x%x\r\n", sens->adrr >> 1);
	hyt939_status = 1;
	HYT939_MR(sens->adrr);
	HAL_Delay(50);

	if (hyt939_status == 1)
	{
		HYT939_DF(sens->adrr, rxdatas);
		sens->temp = ((rxdatas[2] * 256.0) + (rxdatas[3] & 0xFC)) / 4 * 165.0 / 16383.0 - 40.0;
		sens->hum = sens->gain * ((((rxdatas[0] & 0x3F) * 256.0) + rxdatas[1]) * 100.0 / 16383.0) + sens->offset;

		if (sens->hum > 100)
		{
			sens->hum = 100;
		}
		else if (sens->hum < 0)
		{
			sens->hum = 0;
		}

		if (sens->temp > 125)
		{
			sens->temp = 125;
		}
		else if (sens->temp < -40)
		{
			sens->temp = -40;
		}
	}
	else
	{
		sens->temp = -40;
		sens->hum = 100;
	}
				PRINTF("\r\nHYT939_temp:%.2f,HYT939_hum:%.2f\r\n", sens->temp,sens->hum); 
}

bool sensor_response_state(hyt_sensor *sens)
{
	bool status = 0;
	uint8_t txdata[1] = {0x80};

	uint32_t currentTime = TimerGetCurrentTime();
	while (HAL_I2C_Master_Transmit(&I2cHandle40, sens->adrr, txdata, 1, 1000) != HAL_OK)
	{
		if (TimerGetElapsedTime(currentTime) >= 500)
		{
			status = 0; // Measurement request failure
			break;
		}
		if (HAL_I2C_GetError(&I2cHandle40) != HAL_I2C_ERROR_AF)
		{
		};
	}

	if (HAL_I2C_Master_Transmit(&I2cHandle40, sens->adrr, txdata, 1, 1000) == HAL_OK)
	{
		status = 1; // Measurement request success
	}
	return status;
}

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
