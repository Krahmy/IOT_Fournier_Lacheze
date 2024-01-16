#include "hc2a.h"
#include "timeServer.h"
#include "bsp.h"

bool hc2a_status;
extern UART_HandleTypeDef  UartHandle1;

void BSP_hc2a_init(void)
{
	uart41_init_uart41();
	uart1_IoInit();
	if (HAL_UART_Init(&UartHandle1) != HAL_OK)
	{
		/* Initialization Error */
		PPRINTF("Error: HC2A UART bus Init failure\r\n");
		Error_Handler();
	}
	if (HAL_UART_Init(&UartHandle1) == HAL_OK)
	{
		PPRINTF("\r\nHC2A UART bus Init success\r\n");
	}
	uart1_IoDeInit();
}


void read_data_hc2a(hc2a_sensor *hc2a_t)
{
    PPRINTF("START MODE 41");
    float temperature = 0;
    float humidity = 0;
    uint8_t txdata[8] = {0x7b, 0x20, 0x39, 0x39, 0x52, 0x44, 0x44, 0x7d}; // Command: { 99RDD }
    uint8_t rxdata[200];

    uart1_IoInit(); // Initialize UART once before the loop

    for (uint8_t i = 0; i < sizeof(txdata); i++)
    {
        rxdata[i] = 0x00;
    }

    hc2a_receive_data(&hc2a_t->temp, &hc2a_t->hum, 2000); // Assuming hc2a_receive_data takes pointers as arguments

    //hc2a_t->temp = temperature;
    //hc2a_t->hum = humidity;

    PPRINTF("\r\n HC2A_temp: %.2f, HC2A_hum: %.2f\r\n", hc2a_t->temp, hc2a_t->hum);

    uart1_IoDeInit();
}

  //uart4_IoDeInit();