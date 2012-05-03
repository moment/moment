ZONE=$(systemsetup -gettimezone | sed "s/Time Zone: //g")

names=(Pacific/Pago_Pago Pacific/Honolulu America/Adak Pacific/Apia Pacific/Marquesas Pacific/Gambier America/Anchorage Pacific/Pitcairn America/Los_Angeles America/Santa_Isabel America/Phoenix America/Denver America/Mazatlan America/Guatemala America/Chicago America/Mexico_City America/Bogota Pacific/Easter America/Havana America/New_York America/Caracas America/Santo_Domingo America/Goose_Bay America/Halifax America/St_Johns America/Argentina/Buenos_Aires America/Campo_Grande America/Santiago America/Miquelon America/Godthab America/Asuncion Atlantic/Stanley America/Noronha America/Sao_Paulo America/Montevideo Atlantic/Cape_Verde Atlantic/Azores Africa/Casablanca Europe/London Africa/Lagos Europe/Berlin Asia/Gaza Asia/Beirut Europe/Minsk Europe/Istanbul Asia/Damascus Asia/Jerusalem Africa/Windhoek Africa/Cairo Africa/Johannesburg Asia/Baghdad Europe/Moscow Asia/Tehran Asia/Dubai Asia/Yerevan Asia/Baku Asia/Kabul Asia/Karachi Asia/Yekaterinburg Asia/Kolkata Asia/Kathmandu Asia/Dhaka Asia/Omsk Asia/Rangoon Asia/Jakarta Asia/Krasnoyarsk Asia/Shanghai Asia/Irkutsk Australia/Eucla Asia/Tokyo Asia/Yakutsk Australia/Darwin Australia/Brisbane Asia/Vladivostok Australia/Adelaide Pacific/Noumea Asia/Kamchatka Australia/Lord_Howe Australia/Sydney Pacific/Norfolk Pacific/Tarawa Pacific/Tongatapu Pacific/Fiji Pacific/Auckland Pacific/Chatham Pacific/Kiritimati)

for name in ${names[@]}
do
	echo "\n\n\n\n\n\n--- Start tests for $name ---"
	systemsetup settimezone $name
	node_modules/.bin/nodeunit ./test/moment ./test/lang --reporter minimal
	echo "--- End tests ---"
done

echo "\n\n--- All tests done! Resetting timezone to $ZONE ---"
systemsetup settimezone $ZONE