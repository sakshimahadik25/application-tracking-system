#! /bin/bash
kill $(ps -a | grep npm | awk '{print $1}')
kill $(ps -a | grep node | awk '{print $1}')
kill $(ps -A | grep python | awk '{print $1}')
