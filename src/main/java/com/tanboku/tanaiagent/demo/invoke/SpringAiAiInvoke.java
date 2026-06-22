package com.tanboku.tanaiagent.demo.invoke;

import jakarta.annotation.Resource;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SpringAiAiInvoke implements CommandLineRunner {

    // 直接使用Spring自动注入的实例，它会自动读取yml里的配置
    @Resource
    private ChatModel dashscopeChatModel;

    @Override
    public void run(String... args) throws Exception {
        AssistantMessage output = dashscopeChatModel.call(new Prompt("你好，我是淡墨"))
                .getResult()
                .getOutput();
        System.out.println("AI回复：" + output.getText());
    }
}