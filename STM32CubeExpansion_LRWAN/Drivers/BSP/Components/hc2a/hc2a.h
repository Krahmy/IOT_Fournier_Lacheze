/******************************************************************************
  * @file    hyt939.h
  * @author  Polytech GE
  * @version V0.1
  * @date    21/09/2022
  * @brief   manages the sensors on the application

  */
  /* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __HC2A_H__
#define __HC2A_H__
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

# include "hw.h"
		typedef struct
		{
			float temp;
			float gain;
			float hum;
			float offset;
		}hc2a_sensor;
    void BSP_hc2a_init(void);
		void read_data_hc2a(hc2a_sensor *hc2a_t);
		
#ifdef __cplusplus
}
#endif
#endif /* __BSP_H__ */
