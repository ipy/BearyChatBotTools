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

返回 `count` 个范围为 `min` 到 `max-1` 的随机整数

### 随机选择工具

    /t random select 兰州拉面 沙县小吃 黄山菜饭骨头汤...

从空格分割的选项中随机选择一个

### UUID

    /t random uuid

生成一个 v4 uuid

    /t random uuid 1

生成一个 v1 uuid

## 转换工具
单位进制等转换工具

### hex2rgb

    /t transform hex2rgb #fff

返回

    rgb(255,255,255)

### md5

    /t transform md5 内容

### base64

    /t transform base64 内容
    /t transform base64 encode 内容

对字符串进行 base64 编码

    /t transform base64 decode 编码内容

base64 解码

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

## 域名查询

    /t domain test.com

查询域名是否已被注册