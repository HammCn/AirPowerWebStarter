#!/bin/bash
clear
echo "\033[36m \n"
echo "===================================================="
echo "\033[36mTell me what you want to do first: "
echo "====================================================\033[33m"
# cd src/airpower && git pull && echo \"\\033[32m基础框架已更新~  ：）\\033[0m\" && cd ../../ && git pull && echo echo \"\\033[32m当前项目已全部更新~  ：）\\033[0m\"
select type in "Only update the AirPower repository" "Update all the repositories"; 

do
    case $type in
        "Only update the AirPower repository")
            echo "\033[0m" && 
            cd src/airpower && git pull && 
            echo "\n\033[32mSUCCESS\t\tAirPower repository has been updated  :)\033[0m" && 
            cd ../../
            echo "\n"
            break;
            ;;
        "Update all the repositories")
            echo "\033[0m\n" && 
            cd src/airpower && git pull && 
            echo "\n\033[34mSUCCESS\t\tAirPower repository has been updated  :)\033[0m\n" && 
            cd ../../ && git pull && 
            echo "\n\033[34mSUCCESS\t\tCurrent project repository has been updated  :)\033[0m" && 
            echo "\033[32mSUCCESS\t\tAll the repositories has been updated success!  :)\033[0m" && 
            echo "\n"
            break;
            ;;
	*)
            echo "\033[41;37mBad Choice :(\033[0m\033[32m";
            ;;
    esac;
done