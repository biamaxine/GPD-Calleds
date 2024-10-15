#!/bin/bash

npm install
npm run build
npm run start -- --host 0.0.0.0
