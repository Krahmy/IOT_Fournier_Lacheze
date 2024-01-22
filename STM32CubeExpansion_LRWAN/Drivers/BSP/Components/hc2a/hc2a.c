#include "hc2a.h"
#include "timeServer.h"
#include "bsp.h"

bool hc2a_status;
extern UART_HandleTypeDef  UartHandle1;

void BSP_hc2a_init(void)
{
	uart41_init_uart41(); //initialisation de la liaison uart
	uart1_IoInit(); //initialisation des broches
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
    PPRINTF("START MODE 21");

    uart1_IoInit(); // initialisation des broches de la liaison uart

    hc2a_receive_data(&hc2a_t->temp, &hc2a_t->hum, 2000); // reception des données dans la structure hc2a


    uart1_IoDeInit(); //libération des broches de la liaison uart
}

  //uart4_IoDeInit();