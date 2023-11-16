// get Memo Content

// take userId, username, and get user's map graphics' mapImage, mapType, mapLayer, mapLink (이거 4개는 context 저장), and everything

// take name and bring all of those users have that name

// 'share' button -> update vviewSetting (public, private),  Link Access (Anyone with the link, only shared user)

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
