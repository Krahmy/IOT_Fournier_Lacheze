/******************************************************************************
  * @file    hyt939.h
  * @author  Polytech GE
  * @version V0.1
  * @date    21/09/2022
  * @brief   manages the sensors on the application

  */
/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __HYT939_H__
#define __HYT939_H__
#ifdef __cplusplus
extern "C"
{
#endif
  /* Includes ------------------------------------------------------------------*/
  /* Exported types ------------------------------------------------------------*/
  /* Exported constants --------------------------------------------------------*/
  /* External variables --------------------------------------------------------*/
  /* Exported macros -----------------------------------------------------------*/
  /* Exported functions ------------------------------------------------------- */
  /**
   * @brief  initialises the
   *
   * @note
   * @retval None
   */

#include "hw.h"
  typedef struct
  {

    uint8_t adrr;

    float temp;

    float hum;

    float gain;

    float offset;
		

  } hyt_sensor;
	
  void BSP_hyt939_Init(void);
  void HYT939_MR(uint8_t adrr);
  void HYT939_DF(uint8_t adrr, uint8_t rxdata[]);
  void tran_HYT939data(hyt_sensor *sens);
  bool sensor_response_state(hyt_sensor *sens);
	void GPIO_HYT_OUTPUT_DeInit(void);
	void GPIO_HYT_OUTPUT_Init(void);
#ifdef __cplusplus
}
#endif
#endif /* __BSP_H__ */
/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
