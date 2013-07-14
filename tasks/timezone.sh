#!/bin/bash

set +e

oses=(macosx archlinux)

macosx=(
    "which systemsetup"
    "systemsetup gettimezone | gawk ' { print \$3 } '"
    "systemsetup settimezone"
    "systemsetup listtimezones | grep -v 'Time Zones:'"
)

archlinux=(
    "which timedatectl"
    "timedatectl status | gawk ' /Timezone:/ { print \$2 } '"
    "timedatectl set-timezone"
    "timedatectl list-timezones"
)

for check_os in "${oses[@]}"; do
    if eval \${$check_os[0]} &>/dev/null; then
        os=$check_os
    fi
done

[ -z $os ] && exit

case $1 in
    get) id=1 ;;
    set) id=2 ;;
    list) id=3 ;;
    *)
        echo "$0 get|list|set" >&2
        exit 1
        ;;
esac

bash -c "$(eval echo \${$os[$id]}) $2"
