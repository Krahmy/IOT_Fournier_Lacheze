function decodeUplink(input) {
	var mode=(input.bytes[6] & 0x7C)>>2;
	var data = {};
	 switch (input.fPort) {
		 case 2:
		 if((mode!=2)&&(mode!=31))
{
  data.BatV=(input.bytes[0]<<8 | input.bytes[1])/1000;
  data.TempC1= parseFloat(((input.bytes[2]<<24>>16 | input.bytes[3])/10).toFixed(2));
  data.ADC_CH0V=(input.bytes[4]<<8 | input.bytes[5])/1000;
  data.Digital_IStatus=(input.bytes[6] & 0x02)? "H":"L";
  if(mode!=6)
  {
	 data.EXTI_Trigger=(input.bytes[6] & 0x01)? "TRUE":"FALSE";
  data.Door_status=(input.bytes[6] & 0x80)? "CLOSE":"OPEN";
  }
}
if(mode=='0')
{
  data.Work_mode="IIC";
  if((input.bytes[9]<<8 | input.bytes[10])===0)
  {
    data.Illum=(input.bytes[7]<<24>>16 |input.bytes[8]);
  }
  else
  {
  data.TempC_SHT=parseFloat(((input.bytes[7]<<24>>16 | input.bytes[8])/10).toFixed(2));
  data.Hum_SHT=parseFloat(((input.bytes[9]<<8 | input.bytes[10])/10).toFixed(1));
  }
}
else if(mode=='1')
{
  data.Work_mode=" Distance";
  data.Distance_cm=parseFloat(((input.bytes[7]<<8 | input.bytes[8])/10) .toFixed(1));
  if((input.bytes[9]<<8 | input.bytes[10])!=65535)
  {
    data.Distance_signal_strength=parseFloat((input.bytes[9]<<8 | input.bytes[10]) .toFixed(0));
  }
}
else if(mode=='2')
{
  data.Work_mode=" 3ADC";
  data.BatV=input.bytes[11]/10;
  data.ADC_CH0V=(input.bytes[0]<<8 | input.bytes[1])/1000;
  data.ADC_CH1V=(input.bytes[2]<<8 | input.bytes[3])/1000;
  data.ADC_CH4V=(input.bytes[4]<<8 | input.bytes[5])/1000;
  data.Digital_IStatus=(input.bytes[6] & 0x02)? "H":"L";
  data.EXTI_Trigger=(input.bytes[6] & 0x01)? "TRUE":"FALSE";
  data.Door_status=(input.bytes[6] & 0x80)? "CLOSE":"OPEN";
  if((input.bytes[9]<<8 | input.bytes[10])===0)
  {
    data.Illum=(input.bytes[7]<<24>>16 | input.bytes[8]);
  }
  else
  {
  data.TempC_SHT=parseFloat(((input.bytes[7]<<24>>16 |input.bytes[8])/10).toFixed(2));
  data.Hum_SHT=parseFloat(((input.bytes[9]<<8 | input.bytes[10])/10) .toFixed(1));
  }
}
else if(mode=='3')
{
  data.Work_mode="3DS18B20";
  data.TempC2=parseFloat(((input.bytes[7]<<24>>16 | input.bytes[8])/10).toFixed(2));
  data.TempC3=parseFloat(((input.bytes[9]<<24>>16| input.bytes[10])/10) .toFixed(2));
  
}
else if(mode=='4')
{
  data.Work_mode="Weight";
  data.Weight=(input.bytes[7]<<24>>16 | input.bytes[8]);
}
else if(mode=='5')
{
  data.Work_mode="Count";
  data.Count=(input.bytes[7]<<24 | input.bytes[8]<<16 | input.bytes[9]<<8 | input.bytes[10]);
}
else if(mode=='30')
{
  //data.TempC_SHT=parseFloat(((input.bytes[7]<<24>>16 | input.bytes[8])/10).toFixed(2));
  //data.Hum_SHT=parseFloat(((input.bytes[9]<<8 | input.bytes[10])/10).toFixed(1));
  
  switch(input.bytes[7]){
	  
	  case 1:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));

			break;
	  
	  case 2:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));

			break;
	  
	  case 3:	

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			break;
	  
	  case 4:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));

			break;
	  
	  case 5:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));

			break;
	  
	  case 6:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));
				
			data.Temp_HYT_5=parseFloat(((input.bytes[28]<<24>>16 | input.bytes[29])/10).toFixed(2));
			data.Hum_HYT_5=parseFloat(((input.bytes[30]<<8 | input.bytes[31])/10).toFixed(1));

			break;
	  
	  case 7:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));
				
			data.Temp_HYT_5=parseFloat(((input.bytes[28]<<24>>16 | input.bytes[29])/10).toFixed(2));
			data.Hum_HYT_5=parseFloat(((input.bytes[30]<<8 | input.bytes[31])/10).toFixed(1));

			data.Temp_HYT_6=parseFloat(((input.bytes[32]<<24>>16 | input.bytes[33])/10).toFixed(2));
			data.Hum_HYT_6=parseFloat(((input.bytes[34]<<8 | input.bytes[35])/10).toFixed(1));

			break;
	  
	  
	  case 8:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));
				
			data.Temp_HYT_5=parseFloat(((input.bytes[28]<<24>>16 | input.bytes[29])/10).toFixed(2));
			data.Hum_HYT_5=parseFloat(((input.bytes[30]<<8 | input.bytes[31])/10).toFixed(1));

			data.Temp_HYT_6=parseFloat(((input.bytes[32]<<24>>16 | input.bytes[33])/10).toFixed(2));
			data.Hum_HYT_6=parseFloat(((input.bytes[34]<<8 | input.bytes[35])/10).toFixed(1));
			
			data.Temp_HYT_7=parseFloat(((input.bytes[36]<<24>>16 | input.bytes[37])/10).toFixed(2));
			data.Hum_HYT_7=parseFloat(((input.bytes[38]<<8 | input.bytes[39])/10).toFixed(1));

			break;
	  
	  
		case 9:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));
				
			data.Temp_HYT_5=parseFloat(((input.bytes[28]<<24>>16 | input.bytes[29])/10).toFixed(2));
			data.Hum_HYT_5=parseFloat(((input.bytes[30]<<8 | input.bytes[31])/10).toFixed(1));

			data.Temp_HYT_6=parseFloat(((input.bytes[32]<<24>>16 | input.bytes[33])/10).toFixed(2));
			data.Hum_HYT_6=parseFloat(((input.bytes[34]<<8 | input.bytes[35])/10).toFixed(1));
			
			data.Temp_HYT_7=parseFloat(((input.bytes[36]<<24>>16 | input.bytes[37])/10).toFixed(2));
			data.Hum_HYT_7=parseFloat(((input.bytes[38]<<8 | input.bytes[39])/10).toFixed(1));
				
			data.Temp_HYT_8=parseFloat(((input.bytes[40]<<24>>16 | input.bytes[41])/10).toFixed(2));
			data.Hum_HYT_8=parseFloat(((input.bytes[42]<<8 | input.bytes[43])/10).toFixed(1));

			break;
			
		case 10:
				

			data.Temp_HYT_0=parseFloat(((input.bytes[8]<<24>>16 | input.bytes[9])/10).toFixed(2));
			data.Hum_HYT_0=parseFloat(((input.bytes[10]<<8 | input.bytes[11])/10).toFixed(1));
				
			data.Temp_HYT_1=parseFloat(((input.bytes[12]<<24>>16 | input.bytes[13])/10).toFixed(2));
			data.Hum_HYT_1=parseFloat(((input.bytes[14]<<8 | input.bytes[15])/10).toFixed(1));
				
			data.Temp_HYT_2=parseFloat(((input.bytes[16]<<24>>16 | input.bytes[17])/10).toFixed(2));
			data.Hum_HYT_2=parseFloat(((input.bytes[18]<<8 | input.bytes[19])/10).toFixed(1));

			data.Temp_HYT_3=parseFloat(((input.bytes[20]<<24>>16 | input.bytes[21])/10).toFixed(2));
			data.Hum_HYT_3=parseFloat(((input.bytes[22]<<8 | input.bytes[23])/10).toFixed(1));
				
			data.Temp_HYT_4=parseFloat(((input.bytes[24]<<24>>16 | input.bytes[25])/10).toFixed(2));
			data.Hum_HYT_4=parseFloat(((input.bytes[26]<<8 | input.bytes[27])/10).toFixed(1));
				
			data.Temp_HYT_5=parseFloat(((input.bytes[28]<<24>>16 | input.bytes[29])/10).toFixed(2));
			data.Hum_HYT_5=parseFloat(((input.bytes[30]<<8 | input.bytes[31])/10).toFixed(1));

			data.Temp_HYT_6=parseFloat(((input.bytes[32]<<24>>16 | input.bytes[33])/10).toFixed(2));
			data.Hum_HYT_6=parseFloat(((input.bytes[34]<<8 | input.bytes[35])/10).toFixed(1));
			
			data.Temp_HYT_7=parseFloat(((input.bytes[36]<<24>>16 | input.bytes[37])/10).toFixed(2));
			data.Hum_HYT_7=parseFloat(((input.bytes[38]<<8 | input.bytes[39])/10).toFixed(1));
				
			data.Temp_HYT_8=parseFloat(((input.bytes[40]<<24>>16 | input.bytes[41])/10).toFixed(2));
			data.Hum_HYT_8=parseFloat(((input.bytes[42]<<8 | input.bytes[43])/10).toFixed(1));
				
			data.Temp_HYT_9=parseFloat(((input.bytes[44]<<24>>16 | input.bytes[45])/10).toFixed(2));
			data.Hum_HYT_9=parseFloat(((input.bytes[46]<<8 | input.bytes[47])/10).toFixed(1));

			break;
	  
	  }

}      

else if(mode=='31')
{
  data.Work_mode="ALARM";
  data.BatV=(input.bytes[0]<<8 | input.bytes[1])/1000;
  data.TempC1= parseFloat(((input.bytes[2]<<24>>16 | input.bytes[3])/10).toFixed(2));
  data.TempC1MIN= input.bytes[4]<<24>>24;
  data.TempC1MAX= input.bytes[5]<<24>>24; 
  data.SHTEMPMIN= input.bytes[7]<<24>>24;
  data.SHTEMPMAX= input.bytes[8]<<24>>24;   
  data.SHTHUMMIN= input.bytes[9];
 data.SHTHUMMAX= input.bytes[10];    
}

  if((input.bytes.length==11)||(input.bytes.length==12)||(input.bytes.length==16)||(input.bytes.length==20)||(input.bytes.length==24)||(input.bytes.length==28)||(input.bytes.length==32)||(input.bytes.length==36)||(input.bytes.length==40)||(input.bytes.length==44)||(input.bytes.length==48))
		 return {
      data: data,
    }
	break;
default:
    return {
      errors: ["unknown FPort"]
    }
  }
}

