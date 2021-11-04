#! /bin/bash
kill $(ps -A | grep flask | awk '{print $1}')
