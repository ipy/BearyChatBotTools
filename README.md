# BearyChatBotTools
BearyChat 机器人，提供一系列常用工具。
设 `/t` = 触发词，
则有：

## 随机工具 random
帮选择困难症患者决定一些事情 (๑•́ ₃ •̀๑)

    /t random

等同于

    /t random int

### 随机整数生成器

    /t random

或

    /t random int

返回范围为 0 到 99 的随机整数

    /t random [min] [max] [count]

返回范围为 `count` 个 `min` 到 `max-1` 的随机整数

### 随机选择工具

    /t random select 选项1 选项2 选项3...

从空格分割的选项中随机选择一个

## 转换工具
单位进制转换工具，目前只实现了 hex 到 rgb 的转换

### hex2rgb

    /t transform hex2rgb #fff

返回

    rgb(255,255,255)

## 短链工具
生成短链，默认使用 `t.cn`

### t.cn

    /t surl t.cn http://baidu.com

返回

    http://t.cn/h5mwx

### dwz.cn
使用百度短链服务生成短链

    /t surl dwz.cn http://baidu.com

#### dwz.cn 短链还原

    /t surl dwz.cn origin http://dwz.cn/xxx

## caniuse 前端兼容性查询工具

    /t caniuse json

## IP 信息查询

    /t ip 117.89.35.58

## 天气查询

    /t weather [城市拼音，如 shanghai]

