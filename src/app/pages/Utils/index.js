// import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: true,
  promptOnMissingPlayServices: true
}

// const firebase = RNFirebase.initializeApp(configurationOptions)

class Utils {

    // static firebase = firebase;

	static colorBlue = '#009cec';
	static colorPrimary = this.colorBlue;
	static colorHintPrimary= '#0095DA99';
	static colorGray = '#b6b6b6';
	static colorHintGray = '#b6b6b644';
	static colorBlack="#000000";
	static colorWhite = "#ffffff";
	static colorAliceBlue="#ECF9FF";
	static colorDarkBlue = "#004C6F";
	static colorRed = "#C70F0F";
	static colorGreen = "#00CC00";
	static colorHintGreen = "#b0e93f55";
	static colorTurquoise = "#59E8FF";
	static colorDarkGray = "#808080";
	static colorLightGray = "#b6b6b655";
	static colorBlue="#2b84f0";
	static colorOrange ="orange";

	static headSize=18;
	static subHeadSize=15;
	static textSize=13;

	static login='loginData';
	static _id='_ID';
	static token='TOKEN';
    static userName='USERNAME';
    static profilePic="PROFILE_PIC";
    static balance='BALANCE';
    static receiveQr='QR_CODE';
    static receiveWA='WALLET_ADDRESS';
    static postUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F61244854%2Fadd-a-no-image-placeholder-on-elementor-pro-post-element-if-there-is-no-featured&psig=AOvVaw0VWscDLOdtDJVGLt13alPd&ust=1596524872086000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjGkeO8_uoCFQAAAAAdAAAAABAD';
	static timeZone=[
                  	  { label: '(UTC-12:00) International Date Line West', value: '(UTC-12:00) International Date Line West', color:'#000000'},
                      { label: '(UTC-11:00) Coordinated Universal Time-11', value: '(UTC-11:00) Coordinated Universal Time-11', color:'#000000'},
                      { label: '(UTC-10:00) Hawaii', value: '(UTC-10:00) Hawaii', color:'#000000'},
                      { label: '(UTC-09:00) Alaska', value: '(UTC-09:00) Alaska', color:'#000000'},
                      { label: '(UTC-08:00) Baja California', value: '(UTC-08:00) Baja California', color:'#000000'},
                      { label: '(UTC-07:00) Pacific Time (US &amp; Canada)', value: '(UTC-07:00) Pacific Time (US &amp; Canada)', color:'#000000'},
                      { label: '(UTC-08:00) Pacific Time (US &amp; Canada)', value: '(UTC-08:00) Pacific Time (US &amp; Canada)', color:'#000000'},
                      { label: '(UTC-07:00) Arizona', value: '(UTC-07:00) Arizona', color:'#000000'},
                      { label: '(UTC-07:00) Chihuahua, La Paz, Mazatlan', value: '(UTC-07:00) Chihuahua, La Paz, Mazatlan', color:'#000000'},
                      { label: '(UTC-07:00) Mountain Time (US &amp; Canada)', value: '(UTC-07:00) Mountain Time (US &amp; Canada)', color:'#000000'},
                      { label: '(UTC-06:00) Central America', value: '(UTC-06:00) Central America', color:'#000000'},
                      { label: '(UTC-06:00) Central Time (US &amp; Canada)', value: '(UTC-06:00) Central Time (US &amp; Canada)', color:'#000000'},
                      { label: '(UTC-06:00) Guadalajara, Mexico City, Monterrey', value: '(UTC-06:00) Guadalajara, Mexico City, Monterrey', color:'#000000'},
                      { label: '(UTC-06:00) Saskatchewan', value: '(UTC-06:00) Saskatchewan', color:'#000000'},
                      { label: '(UTC-05:00) Bogota, Lima, Quito', value: '(UTC-05:00) Bogota, Lima, Quito', color:'#000000'},
                      { label: '(UTC-05:00) Eastern Time (US &amp; Canada)', value: '(UTC-05:00) Eastern Time (US &amp; Canada)', color:'#000000'},
                      { label: '(UTC-05:00) Indiana (East)', value: '(UTC-05:00) Indiana (East)', color:'#000000'},
                      { label: '(UTC-04:30) Caracas', value: '(UTC-04:30) Caracas', color:'#000000'},
                      { label: '(UTC-04:00) Asuncion', value: '(UTC-04:00) Asuncion', color:'#000000'},
                      { label: '(UTC-04:00) Atlantic Time (Canada)', value: '(UTC-04:00) Atlantic Time (Canada)', color:'#000000'},
                      { label: '(UTC-04:00) Cuiaba', value: '(UTC-04:00) Cuiaba', color:'#000000'},
                      { label: '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan', value: '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan', color:'#000000'},
                      { label: '(UTC-04:00) Santiago', value: '(UTC-04:00) Santiago', color:'#000000'},
                      { label: '(UTC-03:30) Newfoundland', value: '(UTC-03:30) Newfoundland', color:'#000000'},
                      { label: '(UTC-03:00) Brasilia', value: '(UTC-03:00) Brasilia', color:'#000000'},
                      { label: '(UTC-03:00) Buenos Aires', value: '(UTC-03:00) Buenos Aires', color:'#000000'},
                      { label: '(UTC-03:00) Cayenne, Fortaleza', value: '(UTC-03:00) Cayenne, Fortaleza', color:'#000000'},
                      { label: '(UTC-03:00) Greenland', value: '(UTC-03:00) Greenland', color:'#000000'},
                      { label: '(UTC-03:00) Montevideo', value: '(UTC-03:00) Montevideo', color:'#000000'},
                      { label: '(UTC-03:00) Salvador', value: '(UTC-03:00) Salvador', color:'#000000'},
                      { label: '(UTC-02:00) Coordinated Universal Time-02', value: '(UTC-02:00) Coordinated Universal Time-02', color:'#000000'},
                      { label: '(UTC-02:00) Mid-Atlantic - Old', value: '(UTC-02:00) Mid-Atlantic - Old', color:'#000000'},
                      { label: '(UTC-01:00) Azores', value: '(UTC-01:00) Azores', color:'#000000'},
                      { label: '(UTC-01:00) Cape Verde Is.', value: '(UTC-01:00) Cape Verde Is.', color:'#000000'},
                      { label: '(UTC) Casablanca', value: '(UTC) Casablanca', color:'#000000'},
                      { label: '(UTC) Coordinated Universal Time', value: '(UTC) Coordinated Universal Time', color:'#000000'},
                      { label: '(UTC) Edinburgh, London', value: '(UTC) Edinburgh, London', color:'#000000'},
                      { label: '(UTC+01:00) Edinburgh, London', value: '(UTC+01:00) Edinburgh, London', color:'#000000'},
                      { label: '(UTC) Dublin, Lisbon', value: '(UTC) Dublin, Lisbon', color:'#000000'},
                      { label: '(UTC) Monrovia, Reykjavik', value: '(UTC) Monrovia, Reykjavik', color:'#000000'},
                      { label: '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna', value: '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna', color:'#000000'},
                      { label: '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague', value: '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague', color:'#000000'},
                      { label: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris', value: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris', color:'#000000'},
                      { label: '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb', value: '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb', color:'#000000'},
                      { label: '(UTC+01:00) West Central Africa', value: '(UTC+01:00) West Central Africa', color:'#000000'},
                      { label: '(UTC+01:00) Windhoek', value: '(UTC+01:00) Windhoek', color:'#000000'},
                      { label: '(UTC+02:00) Athens, Bucharest', value: '(UTC+02:00) Athens, Bucharest', color:'#000000'},
                      { label: '(UTC+02:00) Beirut', value: '(UTC+02:00) Beirut', color:'#000000'},
                  	  { label: '(UTC+02:00) Cairo', value: '(UTC+02:00) Cairo', color:'#000000'},
                  	  { label: '(UTC+02:00) Damascus', value: '(UTC+02:00) Damascus', color:'#000000'},
                  	  { label: '(UTC+02:00) E. Europe', value: '(UTC+02:00) E. Europe', color:'#000000'},
                  	  { label: '(UTC+02:00) Harare, Pretoria', value: '(UTC+02:00) Harare, Pretoria', color:'#000000'},
                  	  { label: '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius', value: '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius', color:'#000000'},
                  	  { label: '(UTC+03:00) Istanbul', value: '(UTC+03:00) Istanbul', color:'#000000'},
                  	  { label: '(UTC+02:00) Jerusalem', value: '(UTC+02:00) Jerusalem', color:'#000000'},
                  	  { label: '(UTC+02:00) Tripoli', value: '(UTC+02:00) Tripoli', color:'#000000'},
                  	  { label: '(UTC+03:00) Amman', value: '(UTC+03:00) Amman', color:'#000000'},
                  	  { label: '(UTC+03:00) Baghdad', value: '(UTC+03:00) Baghdad', color:'#000000'},
                  	  { label: '(UTC+03:00) Kaliningrad, Minsk', value: '(UTC+03:00) Kaliningrad, Minsk', color:'#000000'},
                  	  { label: '(UTC+03:00) Kuwait, Riyadh', value: '(UTC+03:00) Kuwait, Riyadh', color:'#000000'},
                  	  { label: '(UTC+03:00) Nairobi', value: '(UTC+03:00) Nairobi', color:'#000000'},
                  	  { label: '(UTC+03:00) Moscow, St. Petersburg, Volgograd', value: '(UTC+03:00) Moscow, St. Petersburg, Volgograd', color:'#000000'},
                  	  { label: '(UTC+04:00) Samara, Ulyanovsk, Saratov', value: '(UTC+04:00) Samara, Ulyanovsk, Saratov', color:'#000000'},
                  	  { label: '(UTC+03:30) Tehran', value: '(UTC+03:30) Tehran', color:'#000000'},
                  	  { label: '(UTC+04:00) Abu Dhabi, Muscat', value: '(UTC+04:00) Abu Dhabi, Muscat', color:'#000000'},
                  	  { label: '(UTC+04:00) Baku', value: '(UTC+04:00) Baku', color:'#000000'},
                  	  { label: '(UTC+04:00) Port Louis', value: '(UTC+04:00) Port Louis', color:'#000000'},
                  	  { label: '(UTC+04:00) Tbilisi', value: '(UTC+04:00) Tbilisi', color:'#000000'},
                  	  { label: '(UTC+04:00) Yerevan', value: '(UTC+04:00) Yerevan', color:'#000000'},
                  	  { label: '(UTC+04:30) Kabul', value: '(UTC+04:30) Kabul', color:'#000000'},
                  	  { label: '(UTC+05:00) Ashgabat, Tashkent', value: '(UTC+05:00) Ashgabat, Tashkent', color:'#000000'},
                  	  { label: '(UTC+05:00) Yekaterinburg', value: '(UTC+05:00) Yekaterinburg', color:'#000000'},
                  	  { label: '(UTC+05:00) Islamabad, Karachi', value: '(UTC+05:00) Islamabad, Karachi', color:'#000000'},
                  	  { label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi', color:'#000000'},
                  	  { label: '(UTC+05:30) Sri Jayawardenepura', value: '(UTC+05:30) Sri Jayawardenepura', color:'#000000'},
                  	  { label: '(UTC+05:45) Kathmandu', value: '(UTC+05:45) Kathmandu', color:'#000000'},
                  	  { label: '(UTC+06:00) Astana', value: '(UTC+06:00) Astana', color:'#000000'},
                  	  { label: '(UTC+06:00) Dhaka', value: '(UTC+06:00) Dhaka', color:'#000000'},
                  	  { label: '(UTC+06:30) Yangon (Rangoon)', value: '(UTC+06:30) Yangon (Rangoon)', color:'#000000'},
                  	  { label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', value: '(UTC+07:00) Bangkok, Hanoi, Jakarta', color:'#000000'},
                  	  { label: '(UTC+07:00) Novosibirsk', value: '(UTC+07:00) Novosibirsk', color:'#000000'},
                  	  { label: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi', value: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi', color:'#000000'},
                  	  { label: '(UTC+08:00) Krasnoyarsk', value: '(UTC+08:00) Krasnoyarsk', color:'#000000'},
                  	  { label: '(UTC+08:00) Kuala Lumpur, Singapore', value: '(UTC+08:00) Kuala Lumpur, Singapore', color:'#000000'},
                  	  { label: '(UTC+08:00) Perth', value: '(UTC+08:00) Perth', color:'#000000'},
                  	  { label: '(UTC+08:00) Taipei', value: '(UTC+08:00) Taipei', color:'#000000'},
                  	  { label: '(UTC+08:00) Ulaanbaatar', value: '(UTC+08:00) Ulaanbaatar', color:'#000000'},
                  	  { label: '(UTC+09:00) Irkutsk', value: '(UTC+09:00) Irkutsk', color:'#000000'},
                  	  { label: '(UTC+09:00) Osaka, Sapporo, Tokyo', value: '(UTC+09:00) Osaka, Sapporo, Tokyo', color:'#000000'},
                  	  { label: '(UTC+09:00) Seoul', value: '(UTC+09:00) Seoul', color:'#000000'},
                  	  { label: '(UTC+09:30) Adelaide', value: '(UTC+09:30) Adelaide', color:'#000000'},
                  	  { label: '(UTC+09:30) Darwin', value: '(UTC+09:30) Darwin', color:'#000000'},
                  	  { label: '(UTC+10:00) Brisbane', value: '(UTC+10:00) Brisbane', color:'#000000'},
                  	  { label: '(UTC+10:00) Canberra, Melbourne, Sydney', value: '(UTC+10:00) Canberra, Melbourne, Sydney', color:'#000000'},
                  	  { label: '(UTC+10:00) Guam, Port Moresby', value: '(UTC+10:00) Guam, Port Moresby', color:'#000000'},
                  	  { label: '(UTC+10:00) Hobart', value: '(UTC+10:00) Hobart', color:'#000000'},
                  	  { label: '(UTC+10:00) Yakutsk', value: '(UTC+10:00) Yakutsk', color:'#000000'},
                  	  { label: '(UTC+11:00) Solomon Is., New Caledonia', value: '(UTC+11:00) Solomon Is., New Caledonia', color:'#000000'},
                  	  { label: '(UTC+11:00) Vladivostok', value: '(UTC+11:00) Vladivostok', color:'#000000'},
                  	  { label: '(UTC+12:00) Auckland, Wellington', value: '(UTC+12:00) Auckland, Wellington', color:'#000000'},
                  	  { label: '(UTC+12:00) Coordinated Universal Time+12', value: '(UTC+12:00) Coordinated Universal Time+12', color:'#000000'},
                  	  { label: '(UTC+12:00) Fiji', value: '(UTC+12:00) Fiji', color:'#000000'},
                  	  { label: '(UTC+12:00) Magadan', value: '(UTC+12:00) Magadan', color:'#000000'},
                  	  { label: '(UTC+12:00) Petropavlovsk-Kamchatsky - Old', value: '(UTC+12:00) Petropavlovsk-Kamchatsky - Old', color:'#000000'},
                  	  { label: '(UTC+13:00) Nuku alofa', value: '(UTC+13:00) Nuku alofa', color:'#000000'},
                  	  { label: '(UTC+13:00) Samoa', value: '(UTC+13:00) Samoa', color:'#000000'},	
                  	]

      static country=[
                    {label:'India', value:'India', color:'#000000'},
                    {label:'Afghanistan', value:'Afghanistan', color:'#000000'},
                    {label:'Aland Islands', value:'Aland Islands', color:'#000000'},
                    {label:'Albania', value:'Albania', color:'#000000'},
                    {label:'Algeria', value:'Algeria', color:'#000000'},
                    {label:'AmericanSamoa', value:'AmericanSamoa', color:'#000000'},
                    {label:'Andorra', value:'Andorra', color:'#000000'},
                    {label:'Angola', value:'Angola', color:'#000000'},
                    {label:'Anguilla', value:'Anguilla', color:'#000000'},
                    {label:'Antarctica', value:'Antarctica', color:'#000000'},
                    {label:'Antigua and Barbuda', value:'Antigua and Barbuda', color:'#000000'},
                    {label:'Argentina', value:'Argentina', color:'#000000'},
                    {label:'Armenia', value:'Armenia', color:'#000000'},
                    {label:'Aruba', value:'Aruba', color:'#000000'},
                    {label:'Australia', value:'Australia', color:'#000000'},
                    {label:'Austria', value:'Austria', color:'#000000'},
                    {label:'Azerbaijan', value:'Azerbaijan', color:'#000000'},
                    {label:'Bahamas', value:'Bahamas', color:'#000000'},
                    {label:'Bahrain', value:'Bahrain', color:'#000000'},
                    {label:'Bangladesh', value:'Bangladesh', color:'#000000'},
                    {label:'Barbados', value:'Barbados', color:'#000000'},
                    {label:'Belarus', value:'Belarus', color:'#000000'},
                    {label:'Belgium', value:'Belgium', color:'#000000'},
                    {label:'Belize', value:'Belize', color:'#000000'},
                    {label:'Benin', value:'Benin', color:'#000000'},
                    {label:'Bermuda', value:'Bermuda', color:'#000000'},
                    {label:'Bhutan', value:'Bhutan', color:'#000000'},
                    {label:'Bolivia, Plurinational State of', value:'Bolivia, Plurinational State of', color:'#000000'},
                    {label:'Bosnia and Herzegovina', value:'Bosnia and Herzegovina', color:'#000000'},
                    {label:'Botswana', value:'Botswana', color:'#000000'},
                    {label:'Brazil', value:'Brazil', color:'#000000'},
                    {label:'British Indian Ocean Territory', value:'British Indian Ocean Territory', color:'#000000'},
                    {label:'Brunei Darussalam', value:'Brunei Darussalam', color:'#000000'},
                    {label:'Bulgaria', value:'Bulgaria', color:'#000000'},
                    {label:'Burkina Faso', value:'Burkina Faso', color:'#000000'},
                    {label:'Burundi', value:'Burundi', color:'#000000'},
                    {label:'Cambodia', value:'Cambodia', color:'#000000'},
                    {label:'Cameroon', value:'Cameroon', color:'#000000'},
                    {label:'Canada', value:'Canada', color:'#000000'},
                    {label:'Cape Verde', value:'Cape Verde', color:'#000000'},
                    {label:'Cayman Islands', value:'Cayman Islands', color:'#000000'},
                    {label:'Central African Republic', value:'Central African Republic', color:'#000000'},
                    {label:'Chad', value:'Chad', color:'#000000'},
                    {label:'Chile', value:'Chile', color:'#000000'},
                    {label:'China', value:'China', color:'#000000'},
                    {label:'Christmas Island', value:'Christmas Island', color:'#000000'},
                    {label:'Cocos (Keeling) Islands', value:'Cocos (Keeling) Islands', color:'#000000'},
                    {label:'Colombia', value:'Colombia', color:'#000000'},
                    {label:'Comoros', value:'Comoros', color:'#000000'},
                    {label:'Congo', value:'Congo', color:'#000000'},
                    {label:'Congo, The Democratic Republic of the Congo', value:'Congo, The Democratic Republic of the Congo', color:'#000000'},
                    {label:'Cook Islands', value:'Cook Islands', color:'#000000'},
                    {label:'Costa Rica', value:'Costa Rica', color:'#000000'},
                    {label:'Cote dIvoire', value:'Cote dIvoire', color:'#000000'},
                    {label:'Croatia', value:'Croatia', color:'#000000'},
                    {label:'Cuba', value:'Cuba', color:'#000000'},
                    {label:'Cyprus', value:'Cyprus', color:'#000000'},
                    {label:'Czech Republic', value:'Czech Republic', color:'#000000'},
                    {label:'Denmark', value:'Denmark', color:'#000000'},
                    {label:'Djibouti', value:'Djibouti', color:'#000000'},
                    {label:'Dominica', value:'Dominica', color:'#000000'},
                    {label:'Dominican Republic', value:'Dominican Republic', color:'#000000'},
                    {label:'Ecuador', value:'Ecuador', color:'#000000'},
                    {label:'Egypt', value:'Egypt', color:'#000000'},
                    {label:'El Salvador', value:'El Salvador', color:'#000000'},
                    {label:'Equatorial Guinea', value:'Equatorial Guinea', color:'#000000'},
                    {label:'Eritrea', value:'Eritrea', color:'#000000'},
                    {label:'Estonia', value:'Estonia', color:'#000000'},
                    {label:'Ethiopia', value:'Ethiopia', color:'#000000'},
                    {label:'Falkland Islands (Malvinas)', value:'Falkland Islands (Malvinas)', color:'#000000'},
                    {label:'Faroe Islands', value:'Faroe Islands', color:'#000000'},
                    {label:'Fiji', value:'Fiji', color:'#000000'},
                    {label:'Finland', value:'Finland', color:'#000000'},
                    {label:'France', value:'France', color:'#000000'},
                    {label:'French Guiana', value:'French Guiana', color:'#000000'},
                    {label:'French Polynesia', value:'French Polynesia', color:'#000000'},
                    {label:'Gabon', value:'Gabon', color:'#000000'},
                    {label:'Gambia', value:'Gambia', color:'#000000'},
                    {label:'Georgia', value:'Georgia', color:'#000000'},
                    {label:'Germany', value:'Germany', color:'#000000'},
                    {label:'Ghana', value:'Ghana', color:'#000000'},
                    {label:'Gibraltar', value:'Gibraltar', color:'#000000'},
                    {label:'Greece', value:'Greece', color:'#000000'},
                    {label:'Greenland', value:'Greenland', color:'#000000'},
                    {label:'Grenada', value:'Grenada', color:'#000000'},
                    {label:'Guadeloupe', value:'Guadeloupe', color:'#000000'},
                    {label:'Guam', value:'Guam', color:'#000000'},
                    {label:'Guatemala', value:'Guatemala', color:'#000000'},
                    {label:'Guernsey', value:'Guernsey', color:'#000000'},
                    {label:'Guinea', value:'Guinea', color:'#000000'},
                    {label:'Guinea-Bissau', value:'Guinea-Bissau', color:'#000000'},
                    {label:'Guyana', value:'Guyana', color:'#000000'},
                    {label:'Haiti', value:'Haiti', color:'#000000'},
                    {label:'Holy See (Vatican City State)', value:'Holy See (Vatican City State)', color:'#000000'},
                    {label:'Honduras', value:'Honduras', color:'#000000'},
                    {label:'Hong Kong', value:'Hong Kong', color:'#000000'},
                    {label:'Hungary', value:'Hungary', color:'#000000'},
                    {label:'Iceland', value:'Iceland', color:'#000000'},
                    {label:'India', value:'India', color:'#000000'},
                    {label:'Indonesia', value:'Indonesia', color:'#000000'},
                    {label:'Iran, Islamic Republic of Persian Gulf', value:'Iran, Islamic Republic of Persian Gulf', color:'#000000'},
                    {label:'Iraq', value:'Iraq', color:'#000000'},
                    {label:'Ireland', value:'Ireland', color:'#000000'},
                    {label:'Isle of Man', value:'Isle of Man', color:'#000000'},
                    {label:'Israel', value:'Israel', color:'#000000'},
                    {label:'Italy', value:'Italy', color:'#000000'},
                    {label:'Jamaica', value:'Jamaica', color:'#000000'},
                    {label:'Japan', value:'Japan', color:'#000000'},
                    {label:'Jersey', value:'Jersey', color:'#000000'},
                    {label:'Jordan', value:'Jordan', color:'#000000'},
                    {label:'Kazakhstan', value:'Kazakhstan', color:'#000000'},
                    {label:'Kenya', value:'Kenya', color:'#000000'},
                    {label:'Kiribati', value:'Kiribati', color:'#000000'},
                    {label:'Korea, Democratic Peoples Republic of Korea', value:'Korea, Democratic Peoples Republic of Korea', color:'#000000'},
                    {label:'Korea, Republic of South Korea', value:'Korea, Republic of South Korea', color:'#000000'},
                    {label:'Kuwait', value:'Kuwait', color:'#000000'},
                    {label:'Kyrgyzstan', value:'Kyrgyzstan', color:'#000000'},
                    {label:'Laos', value:'Laos', color:'#000000'},
                    {label:'Latvia', value:'Latvia', color:'#000000'},
                    {label:'Lebanon', value:'Lebanon', color:'#000000'},
                    {label:'Lesotho', value:'Lesotho', color:'#000000'},
                    {label:'Liberia', value:'Liberia', color:'#000000'},
                    {label:'Libyan Arab Jamahiriya', value:'Libyan Arab Jamahiriya', color:'#000000'},
                    {label:'Liechtenstein', value:'Liechtenstein', color:'#000000'},
                    {label:'Lithuania', value:'Lithuania', color:'#000000'},
                    {label:'Luxembourg', value:'Luxembourg', color:'#000000'},
                    {label:'Macao', value:'Macao', color:'#000000'},
                    {label:'Macedonia', value:'Macedonia', color:'#000000'},
                    {label:'Madagascar', value:'Madagascar', color:'#000000'},
                    {label:'Malawi', value:'Malawi', color:'#000000'},
                    {label:'Malaysia', value:'Malaysia', color:'#000000'},
                    {label:'Maldives', value:'Maldives', color:'#000000'},
                    {label:'Mali', value:'Mali', color:'#000000'},
                    {label:'Malta', value:'Malta', color:'#000000'},
                    {label:'Marshall Islands', value:'Marshall Islands', color:'#000000'},
                    {label:'Martinique', value:'Martinique', color:'#000000'},
                    {label:'Mauritania', value:'Mauritania', color:'#000000'},
                    {label:'Mauritius', value:'Mauritius', color:'#000000'},
                    {label:'Mayotte', value:'Mayotte', color:'#000000'},
                    {label:'Mexico', value:'Mexico', color:'#000000'},
                    {label:'Micronesia, Federated States of Micronesia', value:'Micronesia, Federated States of Micronesia', color:'#000000'},
                    {label:'Moldova', value:'Moldova', color:'#000000'},
                    {label:'Monaco', value:'Monaco', color:'#000000'},
                    {label:'Mongolia', value:'Mongolia', color:'#000000'},
                    {label:'Montenegro', value:'Montenegro', color:'#000000'},
                    {label:'Montserrat', value:'Montserrat', color:'#000000'},
                    {label:'Morocco', value:'Morocco', color:'#000000'},
                    {label:'Mozambique', value:'Mozambique', color:'#000000'},
                    {label:'Myanmar', value:'Myanmar', color:'#000000'},
                    {label:'Namibia', value:'Namibia', color:'#000000'},
                    {label:'Nauru', value:'Nauru', color:'#000000'},
                    {label:'Nepal', value:'Nepal', color:'#000000'},
                    {label:'Netherlands', value:'Netherlands', color:'#000000'},
                    {label:'Netherlands Antilles', value:'Netherlands Antilles', color:'#000000'},
                    {label:'New Caledonia', value:'New Caledonia', color:'#000000'},
                    {label:'New Zealand', value:'New Zealand', color:'#000000'},
                    {label:'Nicaragua', value:'Nicaragua', color:'#000000'},
                    {label:'Niger', value:'Niger', color:'#000000'},
                    {label:'Nigeria', value:'Nigeria', color:'#000000'},
                    {label:'Niue', value:'Niue', color:'#000000'},
                    {label:'Norfolk Island', value:'Norfolk Island', color:'#000000'},
                    {label:'Northern Mariana Islands', value:'Northern Mariana Islands', color:'#000000'},
                    {label:'Norway', value:'Norway', color:'#000000'},
                    {label:'Oman', value:'Oman', color:'#000000'},
                    {label:'Pakistan', value:'Pakistan', color:'#000000'},
                    {label:'Palau', value:'Palau', color:'#000000'},
                    {label:'Palestinian Territory, Occupied', value:'Palestinian Territory, Occupied', color:'#000000'},
                    {label:'Panama', value:'Panama', color:'#000000'},
                    {label:'Papua New Guinea', value:'Papua New Guinea', color:'#000000'},
                    {label:'Paraguay', value:'Paraguay', color:'#000000'},
                    {label:'Peru', value:'Peru', color:'#000000'},
                    {label:'Philippines', value:'Philippines', color:'#000000'},
                    {label:'Pitcairn', value:'Pitcairn', color:'#000000'},
                    {label:'Poland', value:'Poland', color:'#000000'},
                    {label:'Portugal', value:'Portugal', color:'#000000'},
                    {label:'Puerto Rico', value:'Puerto Rico', color:'#000000'},
                    {label:'Qatar', value:'Qatar', color:'#000000'},
                    {label:'Romania', value:'Romania', color:'#000000'},
                    {label:'Russia', value:'Russia', color:'#000000'},
                    {label:'Rwanda', value:'Rwanda', color:'#000000'},
                    {label:'Reunion', value:'Reunion', color:'#000000'},
                    {label:'Saint Barthelemy', value:'Saint Barthelemy', color:'#000000'},
                    {label:'Saint Helena, Ascension and Tristan Da Cunha', value:'Saint Helena, Ascension and Tristan Da Cunha', color:'#000000'},
                    {label:'Saint Kitts and Nevis', value:'Saint Kitts and Nevis', color:'#000000'},
                    {label:'Saint Lucia', value:'Saint Lucia', color:'#000000'},
                    {label:'Saint Martin', value:'Saint Martin', color:'#000000'},
                    {label:'Saint Pierre and Miquelon', value:'Saint Pierre and Miquelon', color:'#000000'},
                    {label:'Saint Vincent and the Grenadines', value:'Saint Vincent and the Grenadines', color:'#000000'},
                    {label:'Samoa', value:'Samoa', color:'#000000'},
                    {label:'San Marino', value:'San Marino', color:'#000000'},
                    {label:'Sao Tome and Principe', value:'Sao Tome and Principe', color:'#000000'},
                    {label:'Saudi Arabia', value:'Saudi Arabia', color:'#000000'},
                    {label:'Senegal', value:'Senegal', color:'#000000'},
                    {label:'Serbia', value:'Serbia', color:'#000000'},
                    {label:'Seychelles', value:'Seychelles', color:'#000000'},
                    {label:'Sierra Leone', value:'Sierra Leone', color:'#000000'},
                    {label:'Singapore', value:'Singapore', color:'#000000'},
                    {label:'Slovakia', value:'Slovakia', color:'#000000'},
                    {label:'Slovenia', value:'Slovenia', color:'#000000'},
                    {label:'Solomon Islands', value:'Solomon Islands', color:'#000000'},
                    {label:'Somalia', value:'Somalia', color:'#000000'},
                    {label:'South Africa', value:'South Africa', color:'#000000'},
                    {label:'South Georgia and the South Sandwich Islands', value:'South Georgia and the South Sandwich Islands', color:'#000000'},
                    {label:'Spain', value:'Spain', color:'#000000'},
                    {label:'Sri Lanka', value:'Sri Lanka', color:'#000000'},
                    {label:'Sudan', value:'Sudan', color:'#000000'},
                    {label:'Suriname', value:'Suriname', color:'#000000'},
                    {label:'Svalbard and Jan Mayen', value:'Svalbard and Jan Mayen', color:'#000000'},
                    {label:'Swaziland', value:'Swaziland', color:'#000000'},
                    {label:'Sweden', value:'Sweden', color:'#000000'},
                    {label:'Switzerland', value:'Switzerland', color:'#000000'},
                    {label:'Syrian Arab Republic', value:'Syrian Arab Republic', color:'#000000'},
                    {label:'Taiwan', value:'Taiwan', color:'#000000'},
                    {label:'Tajikistan', value:'Tajikistan', color:'#000000'},
                    {label:'Tanzania, United Republic of Tanzania', value:'Tanzania, United Republic of Tanzania', color:'#000000'},
                    {label:'Thailand', value:'Thailand', color:'#000000'},
                    {label:'Timor-Leste', value:'Timor-Leste', color:'#000000'},
                    {label:'Togo', value:'Togo', color:'#000000'},
                    {label:'Tokelau', value:'Tokelau', color:'#000000'},
                    {label:'Trinidad and Tobago', value:'Trinidad and Tobago', color:'#000000'},
                    {label:'Tunisia', value:'Tunisia', color:'#000000'},
                    {label:'Turkey', value:'Turkey', color:'#000000'},
                    {label:'Turkmenistan', value:'Turkmenistan', color:'#000000'},
                    {label:'Turks and Caicos Islands', value:'Turks and Caicos Islands', color:'#000000'},
                    {label:'Tuvalu', value:'Tuvalu', color:'#000000'},
                    {label:'Uganda', value:'Uganda', color:'#000000'},
                    {label:'Ukraine', value:'Ukraine', color:'#000000'},
                    {label:'United Arab Emirates', value:'United Arab Emirates', color:'#000000'},
                    {label:'United Kingdom', value:'United Kingdom', color:'#000000'},
                    {label:'United States', value:'United States', color:'#000000'},
                    {label:'Uruguay', value:'Uruguay', color:'#000000'},
                    {label:'Uzbekistan', value:'Uzbekistan', color:'#000000'},
                    {label:'Vanuatu', value:'Vanuatu', color:'#000000'},
                    {label:'Venezuela, Bolivarian Republic of Venezuela', value:'Venezuela, Bolivarian Republic of Venezuela', color:'#000000'},
                    {label:'Vietnam', value:'Vietnam', color:'#000000'},
                    {label:'Virgin Islands, British', value:'Virgin Islands, British', color:'#000000'},
                    {label:'Virgin Islands, U.S.', value:'Virgin Islands, U.S.', color:'#000000'},
                    {label:'Wallis and Futuna', value:'Wallis and Futuna', color:'#000000'},
                    {label:'Yemen', value:'Yemen', color:'#000000'},
                    {label:'Zambia', value:'Zambia', color:'#000000'},
                    {label:'Zimbabwe', value:'Zimbabwe', color:'#000000'},
      
      ]
      static countryCode=[
                    {label:'India (+91)', value:'+91', color:'#000000'},
                    {label:'Afghanistan (+93)', value:'+93', color:'#000000'},
                    {label:'Aland Islands (+358)', value:'+358', color:'#000000'},
                    {label:'Albania (+355)', value:'+355', color:'#000000'},
                    {label:'Algeria (+213)', value:'+213', color:'#000000'},
                    {label:'AmericanSamoa (+1 684)', value:'+1 684', color:'#000000'},
                    {label:'Andorra (+376)', value:'+376', color:'#000000'},
                    {label:'Angola (+244)', value:'+244', color:'#000000'},
                    {label:'Anguilla (+1 264)', value:'+1 264', color:'#000000'},
                    {label:'Antarctica (+672)', value:'+672', color:'#000000'},
                    {label:'Antigua and Barbuda (+1268)', value:'+1268', color:'#000000'},
                    {label:'Argentina (+54)', value:'+54', color:'#000000'},
                    {label:'Armenia (+374)', value:'+374', color:'#000000'},
                    {label:'Aruba (+297)', value:'+297', color:'#000000'},
                    {label:'Australia (+61)', value:'+61', color:'#000000'},
                    {label:'Austria (+43)', value:'+43', color:'#000000'},
                    {label:'Azerbaijan (+994)', value:'+994', color:'#000000'},
                    {label:'Bahamas (+1 242s)', value:'+1 242s', color:'#000000'},
                    {label:'Bahrain (+973)', value:'+973', color:'#000000'},
                    {label:'Bangladesh (+880)', value:'+880', color:'#000000'},
                    {label:'Barbados (+1 246)', value:'+1 246', color:'#000000'},
                    {label:'Belarus (+375)', value:'+375', color:'#000000'},
                    {label:'Belgium (+32)', value:'+32', color:'#000000'},
                    {label:'Belize (+501)', value:'+501', color:'#000000'},
                    {label:'Benin (+229)', value:'+229', color:'#000000'},
                    {label:'Bermuda (+1 441)', value:'+1 441', color:'#000000'},
                    {label:'Bhutan (+975)', value:'+975', color:'#000000'},
                    {label:'Bolivia, Plurinational State of (+591)', value:'+591', color:'#000000'},
                    {label:'Bosnia and Herzegovina (+387)', value:'+387', color:'#000000'},
                    {label:'Botswana (+267)', value:'+267', color:'#000000'},
                    {label:'Brazil (+55)', value:'+55', color:'#000000'},
                    {label:'British Indian Ocean Territory (+246)', value:'+246', color:'#000000'},
                    {label:'Brunei Darussalam (+673)', value:'+673', color:'#000000'},
                    {label:'Bulgaria (+359)', value:'+359', color:'#000000'},
                    {label:'Burkina Faso (+226)', value:'+226', color:'#000000'},
                    {label:'Burundi (+257)', value:'+257', color:'#000000'},
                    {label:'Cambodia (+855)', value:'+855', color:'#000000'},
                    {label:'Cameroon (+237)', value:'+237', color:'#000000'},
                    {label:'Canada (+1)', value:'+1', color:'#000000'},
                    {label:'Cape Verde (+238)', value:'+238', color:'#000000'},
                    {label:'Cayman Islands (+345)', value:'+345', color:'#000000'},
                    {label:'Central African Republic (+236)', value:'+236', color:'#000000'},
                    {label:'Chad (+235)', value:'+235', color:'#000000'},
                    {label:'Chile (+56)', value:'+56', color:'#000000'},
                    {label:'China (+86)', value:'+86', color:'#000000'},
                    {label:'Christmas Island (+61)', value:'+61', color:'#000000'},
                    {label:'Cocos (Keeling) Islands (+61)', value:'+61', color:'#000000'},
                    {label:'Colombia (+57)', value:'+57', color:'#000000'},
                    {label:'Comoros (+269)', value:'+269', color:'#000000'},
                    {label:'Congo (+242)', value:'+242', color:'#000000'},
                    {label:'Congo, The Democratic Republic of the Congo (+243)', value:'+243', color:'#000000'},
                    {label:'Cook Islands (+682)', value:'+682', color:'#000000'},
                    {label:'Costa Rica (+506)', value:'+506', color:'#000000'},
                    {label:'Cote dIvoire (+225)', value:'+225', color:'#000000'},
                    {label:'Croatia (+385)', value:'+385', color:'#000000'},
                    {label:'Cuba (+53)', value:'+53', color:'#000000'},
                    {label:'Cyprus (+357)', value:'+357', color:'#000000'},
                    {label:'Czech Republic (+420)', value:'+420', color:'#000000'},
                    {label:'Denmark (+45)', value:'+45', color:'#000000'},
                    {label:'Djibouti (+253)', value:'+253', color:'#000000'},
                    {label:'Dominica (+1 767)', value:'+1 767', color:'#000000'},
                    {label:'Dominican Republic (+1 849)', value:'+1 849', color:'#000000'},
                    {label:'Ecuador (+593)', value:'+593', color:'#000000'},
                    {label:'Egypt (+20)', value:'+20', color:'#000000'},
                    {label:'El Salvador (+503)', value:'+503', color:'#000000'},
                    {label:'Equatorial Guinea (+240)', value:'+240', color:'#000000'},
                    {label:'Eritrea (+291)', value:'+291', color:'#000000'},
                    {label:'Estonia (+372)', value:'+372', color:'#000000'},
                    {label:'Ethiopia (+251)', value:'+251', color:'#000000'},
                    {label:'Falkland Islands (Malvinas) (+500)', value:'+500', color:'#000000'},
                    {label:'Faroe Islands (+298)', value:'+298', color:'#000000'},
                    {label:'Fiji (+679)', value:'+679', color:'#000000'},
                    {label:'Finland (+358)', value:'+358', color:'#000000'},
                    {label:'France (+33)', value:'+33', color:'#000000'},
                    {label:'French Guiana (+594)', value:'+594', color:'#000000'},
                    {label:'French Polynesia (+689)', value:'+689', color:'#000000'},
                    {label:'Gabon (+241)', value:'+241', color:'#000000'},
                    {label:'Gambia (+220)', value:'+220', color:'#000000'},
                    {label:'Georgia (+995)', value:'+995', color:'#000000'},
                    {label:'Germany (+49)', value:'+49', color:'#000000'},
                    {label:'Ghana (+233)', value:'+233', color:'#000000'},
                    {label:'Gibraltar (+350)', value:'+350', color:'#000000'},
                    {label:'Greece (+30)', value:'+30', color:'#000000'},
                    {label:'Greenland (+299)', value:'+299', color:'#000000'},
                    {label:'Grenada (+1 473)', value:'+1 473', color:'#000000'},
                    {label:'Guadeloupe (+590)', value:'+590', color:'#000000'},
                    {label:'Guam (+1 671)', value:'+1 671', color:'#000000'},
                    {label:'Guatemala (+502)', value:'+502', color:'#000000'},
                    {label:'Guernsey (+44)', value:'+44', color:'#000000'},
                    {label:'Guinea (+224)', value:'+224', color:'#000000'},
                    {label:'Guinea-Bissau (+245)', value:'+245', color:'#000000'},
                    {label:'Guyana (+595)', value:'+595', color:'#000000'},
                    {label:'Haiti (+509)', value:'+509', color:'#000000'},
                    {label:'Holy See (Vatican City State) (+379)', value:'+379', color:'#000000'},
                    {label:'Honduras (+504)', value:'+504', color:'#000000'},
                    {label:'Hong Kong (+852)', value:'+852', color:'#000000'},
                    {label:'Hungary (+36)', value:'+36', color:'#000000'},
                    {label:'Iceland (+354)', value:'+354', color:'#000000'},
                    {label:'India (+91)', value:'+91', color:'#000000'},
                    {label:'Indonesia (+62)', value:'+62', color:'#000000'},
                    {label:'Iran, Islamic Republic of Persian Gulf (+98)', value:'+98', color:'#000000'},
                    {label:'Iraq (+964)', value:'+964', color:'#000000'},
                    {label:'Ireland (+353)', value:'+353', color:'#000000'},
                    {label:'Isle of Man (+44)', value:'+44', color:'#000000'},
                    {label:'Israel (+972)', value:'+972', color:'#000000'},
                    {label:'Italy (+39)', value:'+39', color:'#000000'},
                    {label:'Jamaica (+1 876)', value:'+1 876', color:'#000000'},
                    {label:'Japan (+81)', value:'+81', color:'#000000'},
                    {label:'Jersey (+44)', value:'+44', color:'#000000'},
                    {label:'Jordan (+962)', value:'+962', color:'#000000'},
                    {label:'Kazakhstan (+7 7)', value:'+7 7', color:'#000000'},
                    {label:'Kenya (+254)', value:'+254', color:'#000000'},
                    {label:'Kiribati (+686)', value:'+686', color:'#000000'},
                    {label:'Korea, Democratic Peoples Republic of Korea (+850)', value:'+850', color:'#000000'},
                    {label:'Korea, Republic of South Korea (+82)', value:'+82', color:'#000000'},
                    {label:'Kuwait (+965)', value:'+965', color:'#000000'},
                    {label:'Kyrgyzstan (+996)', value:'+996', color:'#000000'},
                    {label:'Laos (+856)', value:'+856', color:'#000000'},
                    {label:'Latvia (+371)', value:'+371', color:'#000000'},
                    {label:'Lebanon (+961)', value:'+961', color:'#000000'},
                    {label:'Lesotho (+266)', value:'+266', color:'#000000'},
                    {label:'Liberia (+231)', value:'+231', color:'#000000'},
                    {label:'Libyan Arab Jamahiriya (+218)', value:'+218', color:'#000000'},
                    {label:'Liechtenstein (+423)', value:'+423', color:'#000000'},
                    {label:'Lithuania (+370)', value:'+370', color:'#000000'},
                    {label:'Luxembourg (+352)', value:'+352', color:'#000000'},
                    {label:'Macao (+853)', value:'+853', color:'#000000'},
                    {label:'Macedonia (+389)', value:'+389', color:'#000000'},
                    {label:'Madagascar (+261)', value:'+261', color:'#000000'},
                    {label:'Malawi (+265)', value:'+265', color:'#000000'},
                    {label:'Malaysia (+60)', value:'+60', color:'#000000'},
                    {label:'Maldives (+960)', value:'+960', color:'#000000'},
                    {label:'Mali (+223)', value:'+223', color:'#000000'},
                    {label:'Malta (+356)', value:'+356', color:'#000000'},
                    {label:'Marshall Islands (+692)', value:'+692', color:'#000000'},
                    {label:'Martinique (+596)', value:'+596', color:'#000000'},
                    {label:'Mauritania (+222)', value:'+222', color:'#000000'},
                    {label:'Mauritius (+230)', value:'+230', color:'#000000'},
                    {label:'Mayotte (+262)', value:'+262', color:'#000000'},
                    {label:'Mexico (+52)', value:'+52', color:'#000000'},
                    {label:'Micronesia, Federated States of Micronesia (+691)', value:'+691', color:'#000000'},
                    {label:'Moldova (+373)', value:'+373', color:'#000000'},
                    {label:'Monaco (+377)', value:'+377', color:'#000000'},
                    {label:'Mongolia (+976)', value:'+976', color:'#000000'},
                    {label:'Montenegro (+382)', value:'+382', color:'#000000'},
                    {label:'Montserrat (+1664)', value:'+1664', color:'#000000'},
                    {label:'Morocco (+212)', value:'+212', color:'#000000'},
                    {label:'Mozambique (+258)', value:'+258', color:'#000000'},
                    {label:'Myanmar (+95)', value:'+95', color:'#000000'},
                    {label:'Namibia (+264)', value:'+264', color:'#000000'},
                    {label:'Nauru (+674)', value:'+674', color:'#000000'},
                    {label:'Nepal (+977)', value:'+977', color:'#000000'},
                    {label:'Netherlands (+31)', value:'+31', color:'#000000'},
                    {label:'Netherlands Antilles (+599)', value:'+599', color:'#000000'},
                    {label:'New Caledonia (+687)', value:'+687', color:'#000000'},
                    {label:'New Zealand (+64)', value:'+64', color:'#000000'},
                    {label:'Nicaragua (+505)', value:'+505', color:'#000000'},
                    {label:'Niger (+227)', value:'+227', color:'#000000'},
                    {label:'Nigeria (+234)', value:'+234', color:'#000000'},
                    {label:'Niue (+683)', value:'+683', color:'#000000'},
                    {label:'Norfolk Island (+672)', value:'+672', color:'#000000'},
                    {label:'Northern Mariana Islands (+1 670)', value:'+1 670', color:'#000000'},
                    {label:'Norway (+47)', value:'+47', color:'#000000'},
                    {label:'Oman (+968)', value:'+968', color:'#000000'},
                    {label:'Pakistan (+92)', value:'+92', color:'#000000'},
                    {label:'Palau (+680)', value:'+680', color:'#000000'},
                    {label:'Palestinian Territory, Occupied (+970)', value:'+970', color:'#000000'},
                    {label:'Panama (+507)', value:'+507', color:'#000000'},
                    {label:'Papua New Guinea (+675)', value:'+675', color:'#000000'},
                    {label:'Paraguay (+595)', value:'+595', color:'#000000'},
                    {label:'Peru (+51)', value:'+51', color:'#000000'},
                    {label:'Philippines (+63)', value:'+63', color:'#000000'},
                    {label:'Pitcairn (+872)', value:'+872', color:'#000000'},
                    {label:'Poland (+48)', value:'+48', color:'#000000'},
                    {label:'Portugal (+351)', value:'+351', color:'#000000'},
                    {label:'Puerto Rico (+1 939)', value:'+1 939', color:'#000000'},
                    {label:'Qatar (+974)', value:'+974', color:'#000000'},
                    {label:'Romania (+40)', value:'+40', color:'#000000'},
                    {label:'Russia (+7)', value:'+7', color:'#000000'},
                    {label:'Rwanda (+250)', value:'+250', color:'#000000'},
                    {label:'Reunion (+262)', value:'+262', color:'#000000'},
                    {label:'Saint Barthelemy (+590)', value:'+590', color:'#000000'},
                    {label:'Saint Helena, Ascension and Tristan Da Cunha (+290)', value:'+290', color:'#000000'},
                    {label:'Saint Kitts and Nevis (+1 869)', value:'+1 869', color:'#000000'},
                    {label:'Saint Lucia (+1 758)', value:'+1 758', color:'#000000'},
                    {label:'Saint Martin (+590)', value:'+590', color:'#000000'},
                    {label:'Saint Pierre and Miquelon (+508', value:'+508', color:'#000000'},
                    {label:'Saint Vincent and the Grenadines (+1 784)', value:'+1 784', color:'#000000'},
                    {label:'Samoa (+685)', value:'+685', color:'#000000'},
                    {label:'San Marino (+378)', value:'+378', color:'#000000'},
                    {label:'Sao Tome and Principe (+239)', value:'+239', color:'#000000'},
                    {label:'Saudi Arabia (+966)', value:'+966', color:'#000000'},
                    {label:'Senegal (+221)', value:'+221', color:'#000000'},
                    {label:'Serbia (+381)', value:'+381', color:'#000000'},
                    {label:'Seychelles (+248)', value:'+248', color:'#000000'},
                    {label:'Sierra Leone (+232)', value:'+232', color:'#000000'},
                    {label:'Singapore (+65)', value:'+65', color:'#000000'},
                    {label:'Slovakia (+421)', value:'+421', color:'#000000'},
                    {label:'Slovenia (+386)', value:'+386', color:'#000000'},
                    {label:'Solomon Islands (+677)', value:'+677', color:'#000000'},
                    {label:'Somalia (+252)', value:'+252', color:'#000000'},
                    {label:'South Africa (+27)', value:'+27', color:'#000000'},
                    {label:'South Georgia and the South Sandwich Islands (+500)', value:'+500', color:'#000000'},
                    {label:'Spain (+34)', value:'+34', color:'#000000'},
                    {label:'Sri Lanka (+94)', value:'+94', color:'#000000'},
                    {label:'Sudan (+249)', value:'+249', color:'#000000'},
                    {label:'Suriname (+597)', value:'+597', color:'#000000'},
                    {label:'Svalbard and Jan Mayen (+47)', value:'+47', color:'#000000'},
                    {label:'Swaziland (+268)', value:'+268', color:'#000000'},
                    {label:'Sweden (+46)', value:'+46', color:'#000000'},
                    {label:'Switzerland (+41)', value:'+41', color:'#000000'},
                    {label:'Syrian Arab Republic (+963)', value:'+963', color:'#000000'},
                    {label:'Taiwan (+886)', value:'+886', color:'#000000'},
                    {label:'Tajikistan (+992)', value:'+992', color:'#000000'},
                    {label:'Tanzania, United Republic of Tanzania (+255)', value:'+255', color:'#000000'},
                    {label:'Thailand (+66)', value:'+66', color:'#000000'},
                    {label:'Timor-Leste (+670)', value:'+670', color:'#000000'},
                    {label:'Togo (+228)', value:'+228', color:'#000000'},
                    {label:'Tokelau (+690)', value:'+690', color:'#000000'},
                    {label:'Tonga (+676)', value:'+690', color:'#000000'},
                    {label:'Trinidad and Tobago (+1 868)', value:'+1 868', color:'#000000'},
                    {label:'Tunisia (+216)', value:'+216', color:'#000000'},
                    {label:'Turkey (+90)', value:'+90', color:'#000000'},
                    {label:'Turkmenistan (+993)', value:'+993', color:'#000000'},
                    {label:'Turks and Caicos Islands (+1 649)', value:'+1 649', color:'#000000'},
                    {label:'Tuvalu (+688)', value:'+688', color:'#000000'},
                    {label:'Uganda (+256)', value:'+256', color:'#000000'},
                    {label:'Ukraine (+380)', value:'+380', color:'#000000'},
                    {label:'United Arab Emirates (+971)', value:'+971', color:'#000000'},
                    {label:'United Kingdom (+44)', value:'+44', color:'#000000'},
                    {label:'United States', value:'+1', color:'#000000'},
                    {label:'Uruguay (+598)', value:'+598', color:'#000000'},
                    {label:'Uzbekistan (+998)', value:'+998', color:'#000000'},
                    {label:'Vanuatu (+678)', value:'+678', color:'#000000'},
                    {label:'Venezuela, Bolivarian Republic of Venezuela (+58)', value:'+58', color:'#000000'},
                    {label:'Vietnam (+84)', value:'+84', color:'#000000'},
                    {label:'Virgin Islands, British (+1 284)', value:'+1 284', color:'#000000'},
                    {label:'Virgin Islands, U.S. (+1 340)', value:'+1 340', color:'#000000'},
                    {label:'Wallis and Futuna (+681)', value:'+681', color:'#000000'},
                    {label:'Yemen (+967)', value:'+967', color:'#000000'},
                    {label:'Zambia (+260)', value:'+260', color:'#000000'},
                    {label:'Zimbabwe (+263)', value:'+263', color:'#000000'},
      
      ]

      static currency=[
                            {
                                label: "INR", value: "INR"  , color:'#000000' },
                            {
                                label: "CAD", value: "CAD"  , color:'#000000' },
                            {
                                label: "EUR", value: "EUR"  , color:'#000000' },
                            {
                                label: "AED", value: "AED"  , color:'#000000' },
                            {
                                label: "AFN", value: "AFN"  , color:'#000000' },
                            {
                                label: "ALL", value: "ALL"  , color:'#000000' },
                            {
                                label: "AMD", value: "AMD"  , color:'#000000' },
                            {
                                label: "ARS", value: "ARS"  , color:'#000000' },
                            {
                                label: "AUD", value: "AUD"  , color:'#000000' },
                            {
                                label: "AZN", value: "AZN"  , color:'#000000' },
                            {
                                label: "BAM", value: "BAM"  , color:'#000000' },
                            {
                                label: "BDT", value: "BDT"  , color:'#000000' },
                            {
                                label: "BGN", value: "BGN"  , color:'#000000' },
                            {
                                label: "BHD", value: "BHD"  , color:'#000000' },
                            {
                                label: "BIF", value: "BIF"  , color:'#000000' },
                            {
                                label: "BND", value: "BND"  , color:'#000000' },
                            {
                                label: "BOB", value: "BOB"  , color:'#000000' },
                            {
                                label: "BRL", value: "BRL"  , color:'#000000' },
                            {
                                label: "BWP", value: "BWP"  , color:'#000000' },
                            {
                                label: "BYR", value: "BYR"  , color:'#000000' },
                            {
                                label: "BZD", value: "BZD"  , color:'#000000' },
                            {
                                label: "CDF", value: "CDF"  , color:'#000000' },
                            {
                                label: "CHF", value: "CHF"  , color:'#000000' },
                            {
                                label: "CLP", value: "CLP"  , color:'#000000' },
                            {
                                label: "CNY", value: "CNY"  , color:'#000000' },
                            {
                                label: "COP", value: "COP"  , color:'#000000' },
                            {
                                label: "CRC", value: "CRC"  , color:'#000000' },
                            {
                                label: "CVE", value: "CVE"  , color:'#000000' },
                            {
                                label: "CZK", value: "CZK"  , color:'#000000' },
                            {
                                label: "DJF", value: "DJF"  , color:'#000000' },
                            {
                                label: "DKK", value: "DKK"  , color:'#000000' },
                            {
                                label: "DOP", value: "DOP"  , color:'#000000' },
                            {
                                label: "DZD", value: "DZD"  , color:'#000000' },
                            {
                                label: "EEK", value: "EEK"  , color:'#000000' },
                            {
                                label: "EGP", value: "EGP"  , color:'#000000' },
                            {
                                label: "ERN", value: "ERN"  , color:'#000000' },
                            {
                                label: "ETB", value: "ETB"  , color:'#000000' },
                            {
                                label: "GBP", value: "GBP"  , color:'#000000' },
                            {
                                label: "GEL", value: "GEL"  , color:'#000000' },
                            {
                                label: "GHS", value: "GHS"  , color:'#000000' },
                            {
                                label: "GNF", value: "GNF"  , color:'#000000' },
                            {
                                label: "GTQ", value: "GTQ"  , color:'#000000' },
                            {
                                label: "HKD", value: "HKD"  , color:'#000000' },
                            {
                                label: "HNL", value: "HNL"  , color:'#000000' },
                            {
                                label: "HRK", value: "HRK"  , color:'#000000' },
                            {
                                label: "HUF", value: "HUF"  , color:'#000000' },
                            {
                                label: "IDR", value: "IDR"  , color:'#000000' },
                            {
                                label: "ILS", value: "ILS"  , color:'#000000' },
                            {
                                label: "USD", value: "USD"  , color:'#000000' },
                            {
                                label: "IQD", value: "IQD"  , color:'#000000' },
                            {
                                label: "IRR", value: "IRR"  , color:'#000000' },
                            {
                                label: "ISK", value: "ISK"  , color:'#000000' },
                            {
                                label: "JMD", value: "JMD"  , color:'#000000' },
                            {
                                label: "JOD", value: "JOD"  , color:'#000000' },
                            {
                                label: "JPY", value: "JPY"  , color:'#000000' },
                            {
                                label: "KES", value: "KES"  , color:'#000000' },
                            {
                                label: "KHR", value: "KHR"  , color:'#000000' },
                            {
                                label: "KMF", value: "KMF"  , color:'#000000' },
                            {
                                label: "KRW", value: "KRW"  , color:'#000000' },
                            {
                                label: "KWD", value: "KWD"  , color:'#000000' },
                            {
                                label: "KZT", value: "KZT"  , color:'#000000' },
                            {
                                label: "LBP", value: "LBP"  , color:'#000000' },
                            {
                                label: "LKR", value: "LKR"  , color:'#000000' },
                            {
                                label: "LTL", value: "LTL"  , color:'#000000' },
                            {
                                label: "LVL", value: "LVL"  , color:'#000000' },
                            {
                                label: "LYD", value: "LYD"  , color:'#000000' },
                            {
                                label: "MAD", value: "MAD"  , color:'#000000' },
                            {
                                label: "MDL", value: "MDL"  , color:'#000000' },
                            {
                                label: "MGA", value: "MGA"  , color:'#000000' },
                            {
                                label: "MKD", value: "MKD"  , color:'#000000' },
                            {
                                label: "MMK", value: "MMK"  , color:'#000000' },
                            {
                                label: "MOP", value: "MOP"  , color:'#000000' },
                            {
                                label: "MUR", value: "MUR"  , color:'#000000' },
                            {
                                label: "MXN", value: "MXN"  , color:'#000000' },
                            {
                                label: "MYR", value: "MYR"  , color:'#000000' },
                            {
                                label: "MZN", value: "MZN"  , color:'#000000' },
                            {
                                label: "NAD", value: "NAD"  , color:'#000000' },
                            {
                                label: "NGN", value: "NGN"  , color:'#000000' },
                            {
                                label: "NIO", value: "NIO"  , color:'#000000' },
                            {
                                label: "NOK", value: "NOK"  , color:'#000000' },
                            {
                                label: "NPR", value: "NPR"  , color:'#000000' },
                            {
                                label: "NZD", value: "NZD"  , color:'#000000' },
                            {
                                label: "OMR", value: "OMR"  , color:'#000000' },
                            {
                                label: "PAB", value: "PAB"  , color:'#000000' },
                            {
                                label: "PEN", value: "PEN"  , color:'#000000' },
                            {
                                label: "PHP", value: "PHP"  , color:'#000000' },
                            {
                                label: "PKR", value: "PKR"  , color:'#000000' },
                            {
                                label: "PLN", value: "PLN"  , color:'#000000' },
                            {
                                label: "PYG", value: "PYG"  , color:'#000000' },
                            {
                                label: "QAR", value: "QAR"  , color:'#000000' },
                            {
                                label: "RON", value: "RON"  , color:'#000000' },
                            {
                                label: "RSD", value: "RSD"  , color:'#000000' },
                            {
                                label: "RUB", value: "RUB"  , color:'#000000' },
                            {
                                label: "RWF", value: "RWF"  , color:'#000000' },
                            {
                                label: "SAR", value: "SAR"  , color:'#000000' },
                            {
                                label: "SDG", value: "SDG"  , color:'#000000' },
                            {
                                label: "SEK", value: "SEK"  , color:'#000000' },
                            {
                                label: "SGD", value: "SGD"  , color:'#000000' },
                            {
                                label: "SOS", value: "SOS"  , color:'#000000' },
                            {
                                label: "SYP", value: "SYP"  , color:'#000000' },
                            {
                                label: "THB", value: "THB"  , color:'#000000' },
                            {
                                label: "TND", value: "TND"  , color:'#000000' },
                            {
                                label: "TOP", value: "TOP"  , color:'#000000' },
                            {
                                label: "TRY", value: "TRY"  , color:'#000000' },
                            {
                                label: "TTD", value: "TTD"  , color:'#000000' },
                            {
                                label: "TWD", value: "TWD"  , color:'#000000' },
                            {
                                label: "TZS", value: "TZS"  , color:'#000000' },
                            {
                                label: "UAH", value: "UAH"  , color:'#000000' },
                            {
                                label: "UGX", value: "UGX"  , color:'#000000' },
                            {
                                label: "UYU", value: "UYU"  , color:'#000000' },
                            {
                                label: "UZS", value: "UZS"  , color:'#000000' },
                            {
                                label: "VEF", value: "VEF"  , color:'#000000' },
                            {
                                label: "VND", value: "VND"  , color:'#000000' },
                            {
                                label: "XAF", value: "XAF"  , color:'#000000' },
                            {
                                label: "XOF", value: "XOF"  , color:'#000000' },
                            {
                                label: "YER", value: "YER"  , color:'#000000' },
                            {
                                label: "ZAR", value: "ZAR"  , color:'#000000' },
                            {
                                label: "ZMK", value: "ZMK"  , color:'#000000' }
      ]

}

export default Utils;