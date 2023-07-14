const countriesData = [
    { country: 'Algeria', code: 'ar' },
    { country: 'Angola', code: 'pt' },
    { country: 'Benin', code: 'fr' },
    { country: 'Botswana', code: 'en' },
    { country: 'Burkina Faso', code: 'fr' },
    { country: 'Burundi', code: 'fr' },
    { country: 'Cameroon', code: 'fr' },
    { country: 'Cape Verde', code: 'pt' },
    { country: 'Chad', code: 'fr' },
    { country: 'Comoros', code: 'ar' },
    { country: 'Côte d\'Ivoire', code: 'fr' },
    { country: 'Democratic Republic of the Congo', code: 'fr' },
    { country: 'Djibouti', code: 'fr' },
    { country: 'Egypt', code: 'ar' },
    { country: 'Ethiopia', code: 'am' },
    { country: 'Equatorial Guinea', code: 'es' },
    { country: 'Eswatini', code: 'en' },
    { country: 'Gabon', code: 'fr' },
    { country: 'Gambia', code: 'en' },
    { country: 'Ghana', code: 'en' },
    { country: 'Guinea', code: 'fr' },
    { country: 'Guinea-Bissau', code: 'pt' },
    { country: 'Kenya', code: 'sw' },
    { country: 'Lesotho', code: 'en' },
    { country: 'Liberia', code: 'en' },
    { country: 'Libya', code: 'ar' },
    { country: 'Madagascar', code: 'mg' },
    { country: 'Malawi', code: 'ny' },
    { country: 'Mali', code: 'fr' },
    { country: 'Mauritania', code: 'ar' },
    { country: 'Mauritius', code: 'en' },
    { country: 'Morocco', code: 'ar' },
    { country: 'Mozambique', code: 'pt' },
    { country: 'Namibia', code: 'en' },
    { country: 'Niger', code: 'fr' },
    { country: 'Nigeria', code: 'en' },
    { country: 'Republic of the Congo', code: 'fr' },
    { country: 'Rwanda', code: 'rw' },
    { country: 'São Tomé and Príncipe', code: 'pt' },
    { country: 'Senegal', code: 'fr' },
    { country: 'Seychelles', code: 'en' },
    { country: 'Sierra Leone', code: 'en' },
    { country: 'South Africa', code: 'en' },
    { country: 'Tanzania', code: 'sw' },
    { country: 'Togo', code: 'fr' },
    { country: 'Tunisia', code: 'ar' },
    { country: 'Uganda', code: 'en' },
    { country: 'Zambia', code: 'en' },
    { country: 'Zimbabwe', code: 'en' },
    { country: 'Armenia', code: 'hy' },
    { country: 'Azerbaijan', code: 'az' },
    { country: 'Bahrain', code: 'ar' },
    { country: 'Bangladesh', code: 'bn' },
    { country: 'Bhutan', code: 'dz' },
    { country: 'Brunei Darussalam', code: 'ms' },
    { country: 'Cambodia', code: 'km' },
    { country: 'Georgia', code: 'ka' },
    { country: 'Hong Kong', code: 'zh' },
    { country: 'India', code: 'hi' },
    { country: 'Indonesia', code: 'id' },
    { country: 'Iraq', code: 'ar' },
    { country: 'Israel', code: 'he' },
    { country: 'Japan', code: 'ja' },
    { country: 'Jordan', code: 'ar' },
    { country: 'Kuwait', code: 'ar' },
    { country: 'Kyrgyzstan', code: 'ky' },
    { country: 'Lao People\'s Democratic Republic', code: 'lo' },
    { country: 'Lebanon', code: 'ar' },
    { country: 'Macao', code: 'zh' },
    { country: 'Malaysia', code: 'ms' },
    { country: 'Maldives', code: 'dv' },
    { country: 'Mongolia', code: 'mn' },
    { country: 'Nepal', code: 'ne' },
    { country: 'Oman', code: 'ar' },
    { country: 'Pakistan', code: 'ur' },
    { country: 'Palestine', code: 'ar' },
    { country: 'Philippines', code: 'fil' },
    { country: 'Qatar', code: 'ar' },
    { country: 'Saudi Arabia', code: 'ar' },
    { country: 'Singapore', code: 'en' },
    { country: 'South Korea', code: 'ko' },
    { country: 'Sri Lanka', code: 'si' },
    { country: 'Taiwan', code: 'zh' },
    { country: 'Tajikistan', code: 'tg' },
    { country: 'Thailand', code: 'th' },
    { country: 'Timor-Leste', code: 'pt' },
    { country: 'United Arab Emirates', code: 'ar' },
    { country: 'Uzbekistan', code: 'uz' },
    { country: 'Vietnam', code: 'vi' },
    { country: 'Åland', code: 'sv' },
    { country: 'Albania', code: 'sq' },
    { country: 'Andorra', code: 'ca' },
    { country: 'Anguilla', code: 'en' },
    { country: 'Ascension', code: 'en' },
    { country: 'Austria', code: 'de' },
    { country: 'Azores', code: 'pt' },
    { country: 'Balearic Islands', code: 'ca' },
    { country: 'Belarus', code: 'be' },
    { country: 'Belgium', code: 'nl' },
    { country: 'Bermuda', code: 'en' },
    { country: 'Bosnia', code: 'bs' },
    { country: 'British Virgin Islands', code: 'en' },
    { country: 'Bulgaria', code: 'bg' },
    { country: 'Canary Islands', code: 'es' },
    { country: 'Cayman Islands', code: 'en' },
    { country: 'Ceuta', code: 'es' },
    { country: 'Croatia', code: 'hr' },
    { country: 'Cyprus', code: 'el' },
    { country: 'Czech Republic', code: 'cs' },
    { country: 'Denmark', code: 'da' },
    { country: 'Estonia', code: 'et' },
    { country: 'Falkland Islands', code: 'en' },
    { country: 'Faroe Islands', code: 'fo' },
    { country: 'Finland', code: 'fi' },
    { country: 'France', code: 'fr' },
    { country: 'French Guiana', code: 'fr' },
    { country: 'French Polynesia', code: 'fr' },
    { country: 'Germany', code: 'de' },
    { country: 'Gibraltar', code: 'en' },
    { country: 'Greece', code: 'el' },
    { country: 'Greenland', code: 'kl' },
    { country: 'Guadeloupe', code: 'fr' },
    { country: 'Guernsey', code: 'en' },
    { country: 'Hungary', code: 'hu' },
    { country: 'Iceland', code: 'is' },
    { country: 'Ireland', code: 'ga' },
    { country: 'Isle of Man', code: 'en' },
    { country: 'Italy', code: 'it' },
    { country: 'Jersey', code: 'en' },
    { country: 'Kazakhstan', code: 'kk' },
    { country: 'Kosovo', code: 'sq' },
    { country: 'Latvia', code: 'lv' },
    { country: 'Liechtenstein', code: 'de' },
    { country: 'Lithuania', code: 'lt' },
    { country: 'Luxembourg', code: 'lb' },
    { country: 'Madeira', code: 'pt' },
    { country: 'Malta', code: 'mt' },
    { country: 'Martinique', code: 'fr' },
    { country: 'Mayotte', code: 'fr' },
    { country: 'Melilla', code: 'es' },
    { country: 'Moldova', code: 'ro' },
    { country: 'Monaco', code: 'fr' },
    { country: 'Montenegro', code: 'sr' },
    { country: 'Montserrat', code: 'en' },
    { country: 'Netherlands', code: 'nl' },
    { country: 'New Caledonia', code: 'fr' },
    { country: 'North Macedonia', code: 'mk' },
    { country: 'Norway', code: 'no' },
    { country: 'Pitcairn Islands', code: 'en' },
    { country: 'Poland', code: 'pl' },
    { country: 'Portugal', code: 'pt' },
    { country: 'Romania', code: 'ro' },
    { country: 'Réunion', code: 'fr' },
    { country: 'Saint Barthélemy', code: 'fr' },
    { country: 'Saint Helena', code: 'en' },
    { country: 'Saint Martin', code: 'fr' },
    { country: 'Saint Pierre and Miquelon', code: 'fr' },
    { country: 'San Marino', code: 'it' },
    { country: 'Serbia', code: 'sr' },
    { country: 'Slovakia', code: 'sk' },
    { country: 'Slovenia', code: 'sl' },
    { country: 'Spain', code: 'es' },
    { country: 'Svalbard', code: 'no' },
    { country: 'Sweden', code: 'sv' },
    { country: 'Switzerland', code: 'de' },
    { country: 'Tristan da Cunha', code: 'en' },
    { country: 'Turkey', code: 'tr' },
    { country: 'Turks and Caicos Islands', code: 'en' },
    { country: 'Ukraine', code: 'uk' },
    { country: 'United Kingdom', code: 'en' },
    { country: 'Wallis and Futuna', code: 'fr' },
    { country: 'American Samoa', code: 'sm' },
    { country: 'Antigua and Barbuda', code: 'en' },
    { country: 'Bahamas', code: 'en' },
    { country: 'Barbados', code: 'en' },
    { country: 'Belize', code: 'en' },
    { country: 'Canada', code: 'en' },
    { country: 'Costa Rica', code: 'es' },
    { country: 'Curaçao', code: 'nl' },
    { country: 'Dominica', code: 'en' },
    { country: 'Dominican Republic', code: 'es' },
    { country: 'El Salvador', code: 'es' },
    { country: 'Grenada', code: 'en' },
    { country: 'Guam', code: 'en' },
    { country: 'Guatemala', code: 'es' },
    { country: 'Haiti', code: 'fr' },
    { country: 'Honduras', code: 'es' },
    { country: 'Jamaica', code: 'en' },
    { country: 'Mexico', code: 'es' },
    { country: 'Nicaragua', code: 'es' },
    { country: 'Northern Mariana Islands', code: 'en' },
    { country: 'Panama', code: 'es' },
    { country: 'Puerto Rico', code: 'es' },
    { country: 'St. Kitts and Nevis', code: 'en' },
    { country: 'St. Lucia', code: 'en' },
    { country: 'St. Vincent and the Grenadines', code: 'en' },
    { country: 'Trinidad and Tobago', code: 'en' },
    { country: 'United States', code: 'en' },
    { country: 'United States Minor Outlying Islands (Navassa Island, Baker Island, Howland Island, Jarvis Island, Johnston Atoll, Kingman Reef, Midway Atoll, Wake Atoll)', code: 'en' },
    { country: 'United States Virgin Islands', code: 'en' },
    { country: 'Argentina', code: 'es' },
    { country: 'Aruba', code: 'nl' },
    { country: 'Bolivia', code: 'es' },
    { country: 'Brazil', code: 'pt' },
    { country: 'Chile', code: 'es' },
    { country: 'Colombia', code: 'es' },
    { country: 'Ecuador', code: 'es' },
    { country: 'Guyana', code: 'en' },
    { country: 'Paraguay', code: 'es' },
    { country: 'Peru', code: 'es' },
    { country: 'Sint Maarten', code: 'nl' },
    { country: 'Suriname', code: 'nl' },
    { country: 'Uruguay', code: 'es' },
    { country: 'Venezuela', code: 'es' },
    { country: 'Australia', code: 'en' },
    { country: 'Bonaire', code: 'nl' },
    { country: 'Christmas Island', code: 'en' },
    { country: 'Cocos (Keeling) Islands', code: 'en' },
    { country: 'Cook Islands', code: 'en' },
    { country: 'Fiji', code: 'en' },
    { country: 'Kiribati', code: 'en' },
    { country: 'Marshall Islands', code: 'en' },
    { country: 'Micronesia', code: 'en' },
    { country: 'Nauru', code: 'en' },
    { country: 'New Zealand', code: 'en' },
    { country: 'Niue', code: 'en' },
    { country: 'Norfolk Island', code: 'en' },
    { country: 'Palau', code: 'en' },
    { country: 'Papua New Guinea', code: 'en' },
    { country: 'Saba', code: 'en' },
    { country: 'Samoa', code: 'sm' },
    { country: 'Sint Eustatius', code: 'nl' },
    { country: 'Solomon Islands', code: 'en' },
    { country: 'Tokelau', code: 'en' },
    { country: 'Tonga', code: 'to' },
    { country: 'Tuvalu', code: 'tvl' },
    { country: 'Vanuatu', code: 'bi' }
  ];

  export default countriesData;
  