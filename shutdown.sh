#! /bin/bash
kill $(ps -a | grep flask | awk '{print $1}')
