package com.java.springBoot.utils;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101800715598";  //必须设置
    // 商户私钥，您的PKCS8格式RSA2私钥//必须设置
    public static String merchant_private_key ="MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCWwR4OjCLN1jeo/zv07vH8iGeJL0Ava8+LKhNuB0FxNUv6GlX5kbgdqOjsORPM182SL9dfMFz1jx65GjdvwCZNk8kdscjKcRLjhwjsc7mwUP+kl3sq/vajK99hIUOHLab/U25mR6IFo4CGGMTLmnexQslX5ZNwqO8ThfCgpPFjT0tgPEh9HB79MV6CfYq2rvrLg3R/nkM5q7b7FFr4OvnoY0qZcIVTlZ7pOP7tdwbYLLCtiR0ZFkABEIWb6Mi8NgoiMhgl1at/0zJu18N/FUgA1jQnpHi1ADSoRTelEP1Pp97Qs9EkhysvBGIGCDkH6w8vPxvTD0yx0EOm/ez6K7TRAgMBAAECggEAPhZU+arPXrS+AbT0jYCnWtkWwxIZvi4JsQfoLqWAV06a9utHw1w3VsfM/hTXycKLIIzhh4uUjXGfNp7MfBLH86VM7BTfXDjLjbd8fl1++VWyo6fbiy6shzE3c3pOpGqx33AOBMO1v9rBwPiMfEomx3N5FuEvIvQAWqsMGi00WTCaArJUxs9cEUX7bOrNGOpbah2B9uWA1V448c9qvjLpmWknnG8E4TGr7Y9V5e2NFtQcQ6SK7J21pxzSLf0jVxbd/JrfJ/jtDU176bTdhtzgQ9MtQKo9uIcZh+3Ge5u7xtlW1ZxF8fGhlpl8Tv2GBX7160LltDFjzy40fsC/DWoXwQKBgQDQW0LMecbAaGbxzSNODf3QSl8uKnlYnjAOSvK4/Qh3WlsDepPeINC9sdOSrGnPuf1skO6O/JcdnzUKexE99XPFH2krnUt9TD8fc/yH92GEpa6kPTKivv+ZCRJYeYyXxBc6exloej9boyIFThs80JNYEnF+ytqSO4UEScdDIOfviQKBgQC5OfPYl15VZ0+3FoLSVE2JRUGjcIMv1kSxRXREZmCFmxXlxipA5RqD86KpLlMd8Ssq9fcSizu5ciNTCduPeodg8rqMKVAsEyLHLUT0pPo7mIGqYSPqcMOJJUBzKisV6oPBW52LAcozV3Y/Yy6ZkPQmqzUU6sY0LFBHBzHsSX7BCQKBgEhBDaYpKNJ6ohCCahbcZUOBNwakdhZULSgXt5qNLQ1uyRcov/SM/rZ533wCzGLcBdVLYV82mxULq/IpgW4yG2aloOweDRqzgURgDZf9ItVEO477Jf8oKy0f5zvFUwsiVkfSfporoqMdrGOYlXt+fUpSgwdMQ4XonBVDnJVb6PK5AoGAOkUB8ixET+etSzK4uwQsVDfGW21Ex+LHP2FTH0V5re5I6Dz8A+hO/B3EGSbqnOvGocA5FstYYZGHjVL3kF6Cgjw59Wf1wbfPZAtYuwG/esoSWJAwpUsOKHHgoZotbbqV8lko6ZcJjjdAitZfzY2tURDhJRBqg/VA1+dqjCPezUkCgYAPIVq4nGed0L23mybWyQ/FSNnEgCFLFxczzsyx9Sriy6tO+6Mft+df9NyO+pTQMhHQwlBW2p4cX7AS1TiGdQm33V4HRwaPkTPit36Tj3yasPnquR7LwpArynm4Vdu40z3AWBCChcgKuKAXLm3luER70jSbUoNfPVYYodwAbuxIeg==";
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。//必须设置
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlsEeDowizdY3qP879O7x/IhniS9AL2vPiyoTbgdBcTVL+hpV+ZG4Hajo7DkTzNfNki/XXzBc9Y8euRo3b8AmTZPJHbHIynES44cI7HO5sFD/pJd7Kv72oyvfYSFDhy2m/1NuZkeiBaOAhhjEy5p3sULJV+WTcKjvE4XwoKTxY09LYDxIfRwe/TFegn2Ktq76y4N0f55DOau2+xRa+Dr56GNKmXCFU5We6Tj+7XcG2CywrYkdGRZAARCFm+jIvDYKIjIYJdWrf9MybtfDfxVIANY0J6R4tQA0qEU3pRD9T6fe0LPRJIcrLwRiBgg5B+sPLz8b0w9MsdBDpv3s+iu00QIDAQAB";
	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 支付成功后路径回调 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8090/orders/myOrdersPay";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

