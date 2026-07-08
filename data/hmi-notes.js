window.HMI_NOTES = [
  {
    "id": "2026-07-08-voice-confirmation-error-recovery",
    "date": "2026-07-08",
    "title": "Voice confirmation and error recovery in the intelligent cockpit",
    "topic": "智能座舱语音确认与错误恢复",
    "suggestedTime": "20-25 分钟",
    "summary": "今天练习如何用英语描述车载语音确认、误识别处理、澄清追问和安全可控的错误恢复流程，适合用于语音 HMI 评审、座舱交互策略讨论和用户体验走查。",
    "words": [
      {
        "term": "voice confirmation",
        "phonetic": "/vɔɪs ˌkɑːnfərˈmeɪʃn/",
        "meaning": "语音确认；系统在执行关键操作前用语音或界面向用户确认意图",
        "example": "Voice confirmation prevents the cockpit from executing a risky command after a possible recognition error.",
        "chineseExample": "语音确认可以避免座舱在可能发生识别错误后执行高风险指令。"
      },
      {
        "term": "error recovery",
        "phonetic": "/ˈerər rɪˈkʌvəri/",
        "meaning": "错误恢复；当系统理解、执行或反馈出错时帮助用户回到正确任务路径的机制",
        "example": "Good error recovery gives the driver a simple way to correct the destination without restarting the whole flow.",
        "chineseExample": "良好的错误恢复让驾驶员无需重启整个流程，也能用简单方式修正目的地。"
      },
      {
        "term": "recognition confidence",
        "phonetic": "/ˌrekəɡˈnɪʃn ˈkɑːnfɪdəns/",
        "meaning": "识别置信度；语音系统判断自己识别结果可靠程度的评分或等级",
        "example": "When recognition confidence is low, the assistant should ask a clarification question instead of acting immediately.",
        "chineseExample": "当识别置信度较低时，助手应提出澄清问题，而不是立即执行。"
      },
      {
        "term": "clarification prompt",
        "phonetic": "/ˌklærəfɪˈkeɪʃn prɑːmpt/",
        "meaning": "澄清提示；系统请求用户补充、确认或选择意图的提示语",
        "example": "A clarification prompt should mention the uncertain part of the command in plain language.",
        "chineseExample": "澄清提示应使用清楚语言指出指令中不确定的部分。"
      },
      {
        "term": "command disambiguation",
        "phonetic": "/kəˈmænd ˌdɪsæmˌbɪɡjuˈeɪʃn/",
        "meaning": "指令消歧；在多个可能意图之间帮助用户选择正确操作",
        "example": "Command disambiguation is needed when “call Alex” matches several contacts in the phone book.",
        "chineseExample": "当“给 Alex 打电话”匹配通讯录中的多个联系人时，就需要指令消歧。"
      },
      {
        "term": "fallback interaction",
        "phonetic": "/ˈfɔːlbæk ˌɪntərˈækʃn/",
        "meaning": "兜底交互；语音失败后提供触控、方向盘按键或简化语音路径等替代方案",
        "example": "The fallback interaction can move the user from voice input to a short tappable list on the center display.",
        "chineseExample": "兜底交互可以把用户从语音输入转到中控屏上的短列表选择。"
      },
      {
        "term": "explicit consent",
        "phonetic": "/ɪkˈsplɪsɪt kənˈsent/",
        "meaning": "明确同意；用户清楚表达允许系统执行某项操作的确认",
        "example": "Explicit consent is required before the assistant sends a message or changes a shared vehicle setting.",
        "chineseExample": "在助手发送消息或修改共享车辆设置前，需要获得用户明确同意。"
      },
      {
        "term": "auditory feedback",
        "phonetic": "/ˈɔːdətɔːri ˈfiːdbæk/",
        "meaning": "听觉反馈；通过提示音或语音回复让用户知道系统状态和结果",
        "example": "Auditory feedback should be short enough to avoid covering important navigation guidance.",
        "chineseExample": "听觉反馈应足够简短，避免覆盖重要导航引导。"
      },
      {
        "term": "hands-free correction",
        "phonetic": "/ˌhændz ˈfriː kəˈrekʃn/",
        "meaning": "免手动纠错；用户无需触屏即可通过语音修正系统理解或执行结果",
        "example": "Hands-free correction lets the driver say “no, the second option” while keeping eyes on the road.",
        "chineseExample": "免手动纠错让驾驶员可以说“不，第二个选项”，同时保持视线在道路上。"
      },
      {
        "term": "safe execution threshold",
        "phonetic": "/seɪf ˌeksɪˈkjuːʃn ˈθreʃhoʊld/",
        "meaning": "安全执行阈值；系统决定是否可直接执行语音指令的最低可靠性要求",
        "example": "A safe execution threshold should be stricter for navigation changes than for opening a music playlist.",
        "chineseExample": "导航变更的安全执行阈值应比打开音乐歌单更严格。"
      }
    ],
    "glossary": [
      {
        "term": "voice",
        "phonetic": "/vɔɪs/",
        "meaning": "语音；用户通过说话进行输入的交互方式",
        "example": "Voice input is useful when touch interaction is inconvenient.",
        "chineseExample": "当触控交互不方便时，语音输入很有用。"
      },
      {
        "term": "confirmation",
        "phonetic": "/ˌkɑːnfərˈmeɪʃn/",
        "meaning": "确认；在行动前核对用户意图或系统结果",
        "example": "Confirmation reduces the chance of an unintended action.",
        "chineseExample": "确认可以降低非预期操作的概率。"
      },
      {
        "term": "execute",
        "phonetic": "/ˈeksɪkjuːt/",
        "meaning": "执行；让系统实际完成某项指令",
        "example": "The assistant should not execute a critical command too early.",
        "chineseExample": "助手不应过早执行关键指令。"
      },
      {
        "term": "risky",
        "phonetic": "/ˈrɪski/",
        "meaning": "有风险的；可能影响安全、隐私或任务结果的",
        "example": "A risky command needs a stronger confirmation step.",
        "chineseExample": "有风险的指令需要更强的确认步骤。"
      },
      {
        "term": "command",
        "phonetic": "/kəˈmænd/",
        "meaning": "指令；用户要求系统完成的操作",
        "example": "The command may include an action, object, and condition.",
        "chineseExample": "指令可能包含动作、对象和条件。"
      },
      {
        "term": "recognition",
        "phonetic": "/ˌrekəɡˈnɪʃn/",
        "meaning": "识别；系统把语音输入转换为可理解内容的过程",
        "example": "Recognition can be affected by cabin noise.",
        "chineseExample": "识别可能受到车内噪声影响。"
      },
      {
        "term": "confidence",
        "phonetic": "/ˈkɑːnfɪdəns/",
        "meaning": "置信度；系统对判断结果可靠性的估计",
        "example": "Confidence should guide how assertive the response is.",
        "chineseExample": "置信度应指导回复的确定程度。"
      },
      {
        "term": "assistant",
        "phonetic": "/əˈsɪstənt/",
        "meaning": "助手；帮助用户完成车内任务的语音或智能系统",
        "example": "The assistant should explain what it understood.",
        "chineseExample": "助手应解释它理解了什么。"
      },
      {
        "term": "clarification",
        "phonetic": "/ˌklærəfɪˈkeɪʃn/",
        "meaning": "澄清；消除不确定理解的过程",
        "example": "Clarification is better than silently choosing the wrong option.",
        "chineseExample": "澄清比静默选择错误选项更好。"
      },
      {
        "term": "prompt",
        "phonetic": "/prɑːmpt/",
        "meaning": "提示；系统引导用户下一步操作的话语或界面信息",
        "example": "The prompt should be concise and specific.",
        "chineseExample": "提示应简洁且具体。"
      },
      {
        "term": "uncertain",
        "phonetic": "/ʌnˈsɜːrtn/",
        "meaning": "不确定的；系统无法可靠判断的",
        "example": "The uncertain part of the sentence should be repeated back.",
        "chineseExample": "句子中不确定的部分应被复述出来。"
      },
      {
        "term": "plain language",
        "phonetic": "/pleɪn ˈlæŋɡwɪdʒ/",
        "meaning": "清楚直白的语言；避免技术术语的用户可理解表达",
        "example": "Plain language helps the driver respond quickly.",
        "chineseExample": "清楚直白的语言帮助驾驶员快速回应。"
      },
      {
        "term": "disambiguation",
        "phonetic": "/ˌdɪsæmˌbɪɡjuˈeɪʃn/",
        "meaning": "消歧；从多个可能含义中确定正确含义",
        "example": "Disambiguation is common in contact names and place names.",
        "chineseExample": "消歧常见于联系人姓名和地点名称。"
      },
      {
        "term": "contact",
        "phonetic": "/ˈkɑːntækt/",
        "meaning": "联系人；通讯录中的人或号码",
        "example": "Several contacts may share the same first name.",
        "chineseExample": "多个联系人可能拥有相同名字。"
      },
      {
        "term": "phone book",
        "phonetic": "/ˈfoʊn bʊk/",
        "meaning": "通讯录；保存联系人信息的列表",
        "example": "The phone book can create ambiguity for voice calls.",
        "chineseExample": "通讯录可能给语音拨号带来歧义。"
      },
      {
        "term": "fallback",
        "phonetic": "/ˈfɔːlbæk/",
        "meaning": "兜底方案；主路径失败后的替代路径",
        "example": "A fallback keeps the task moving after voice failure.",
        "chineseExample": "兜底方案让语音失败后的任务仍能继续。"
      },
      {
        "term": "interaction",
        "phonetic": "/ˌɪntərˈækʃn/",
        "meaning": "交互；用户与系统之间的输入、反馈和响应",
        "example": "The interaction should match the driving context.",
        "chineseExample": "交互应匹配驾驶情境。"
      },
      {
        "term": "tappable",
        "phonetic": "/ˈtæpəbl/",
        "meaning": "可点击的；适合触摸选择的界面元素",
        "example": "A tappable list should show only the most likely options.",
        "chineseExample": "可点击列表应只显示最可能的选项。"
      },
      {
        "term": "center display",
        "phonetic": "/ˈsentər dɪˈspleɪ/",
        "meaning": "中控屏；座舱中部用于显示和操作的屏幕",
        "example": "The center display can support voice recovery with visual choices.",
        "chineseExample": "中控屏可以用视觉选项支持语音恢复。"
      },
      {
        "term": "consent",
        "phonetic": "/kənˈsent/",
        "meaning": "同意；用户允许系统执行某项操作",
        "example": "Consent should be explicit for privacy-related actions.",
        "chineseExample": "涉及隐私的操作应获得明确同意。"
      },
      {
        "term": "shared vehicle",
        "phonetic": "/ʃerd ˈviːəkl/",
        "meaning": "共享车辆；由多个用户共同使用的车辆",
        "example": "Shared vehicle settings may affect the next driver.",
        "chineseExample": "共享车辆设置可能影响下一位驾驶员。"
      },
      {
        "term": "setting",
        "phonetic": "/ˈsetɪŋ/",
        "meaning": "设置；系统或车辆功能的配置项",
        "example": "A setting change should be visible after completion.",
        "chineseExample": "设置变更完成后应可见。"
      },
      {
        "term": "auditory",
        "phonetic": "/ˈɔːdətɔːri/",
        "meaning": "听觉的；与声音感知相关的",
        "example": "Auditory cues are useful when the driver cannot look down.",
        "chineseExample": "当驾驶员不能低头看屏幕时，听觉提示很有用。"
      },
      {
        "term": "feedback",
        "phonetic": "/ˈfiːdbæk/",
        "meaning": "反馈；系统对状态、进度或结果的回应",
        "example": "Feedback tells the user whether the system is listening.",
        "chineseExample": "反馈告诉用户系统是否正在聆听。"
      },
      {
        "term": "navigation guidance",
        "phonetic": "/ˌnævɪˈɡeɪʃn ˈɡaɪdns/",
        "meaning": "导航引导；路线、转向和车道相关提示",
        "example": "Navigation guidance should not be masked by long speech.",
        "chineseExample": "导航引导不应被过长语音遮盖。"
      },
      {
        "term": "hands-free",
        "phonetic": "/ˌhændz ˈfriː/",
        "meaning": "免手动的；无需手部操作即可完成的",
        "example": "Hands-free input supports safer correction while driving.",
        "chineseExample": "免手动输入支持驾驶中的更安全纠错。"
      },
      {
        "term": "correction",
        "phonetic": "/kəˈrekʃn/",
        "meaning": "纠错；修正系统误解或错误执行的动作",
        "example": "Correction should be available immediately after a mismatch.",
        "chineseExample": "出现不匹配后应立即提供纠错。"
      },
      {
        "term": "option",
        "phonetic": "/ˈɑːpʃn/",
        "meaning": "选项；用户可以选择的候选结果",
        "example": "The second option may be the correct destination.",
        "chineseExample": "第二个选项可能是正确目的地。"
      },
      {
        "term": "threshold",
        "phonetic": "/ˈθreʃhoʊld/",
        "meaning": "阈值；触发某种系统行为的最低或最高标准",
        "example": "The threshold should vary by task risk.",
        "chineseExample": "阈值应随任务风险变化。"
      },
      {
        "term": "navigation change",
        "phonetic": "/ˌnævɪˈɡeɪʃn tʃeɪndʒ/",
        "meaning": "导航变更；对路线、目的地或途经点的修改",
        "example": "A navigation change may require confirmation at high speed.",
        "chineseExample": "高速行驶时，导航变更可能需要确认。"
      },
      {
        "term": "playlist",
        "phonetic": "/ˈpleɪlɪst/",
        "meaning": "播放列表；音乐或媒体内容的队列",
        "example": "Opening a playlist is usually a lower-risk command.",
        "chineseExample": "打开播放列表通常是较低风险指令。"
      },
      {
        "term": "mismatch",
        "phonetic": "/ˈmɪsmætʃ/",
        "meaning": "不匹配；用户意图与系统理解或结果不一致",
        "example": "A mismatch should be easy to reverse.",
        "chineseExample": "不匹配应容易撤回。"
      }
    ],
    "longReadings": [
      {
        "title": "Designing voice recovery for driving contexts",
        "source": {
          "name": "Original practice text",
          "url": ""
        },
        "text": "In an intelligent cockpit, a voice assistant should not treat every recognized phrase as an instruction that can be executed immediately. Cabin noise, similar contact names, regional accents, and incomplete commands can all reduce recognition confidence. When the confidence score is high and the task is low risk, the system may act directly and provide brief auditory feedback. However, when a command changes navigation, sends a message, or adjusts a shared vehicle setting, the assistant should add a confirmation step. A good confirmation repeats only the critical part of the request, such as the destination, contact, or setting value, and asks the driver to approve it with a short answer. If the system is unsure, it should use a clarification prompt instead of a long apology. For example, it can say, “I found two contacts named Alex. Which one do you want to call?” The recovery path should also support hands-free correction, because the driver may not be able to touch the center display. If voice recovery fails twice, a fallback interaction can present a short tappable list when the driving workload is lower. The goal is not to make the assistant sound clever; the goal is to keep the task understandable, reversible, and safe.",
        "translation": "在智能座舱中，语音助手不应把每一句识别到的话都当作可以立即执行的指令。车内噪声、相似联系人姓名、地区口音和不完整指令都会降低识别置信度。当置信度较高且任务风险较低时，系统可以直接执行并给出简短听觉反馈。但是，当指令会改变导航、发送消息或调整共享车辆设置时，助手应增加确认步骤。好的确认只复述请求中的关键部分，例如目的地、联系人或设置值，并让驾驶员用简短回答批准。如果系统不确定，应使用澄清提示，而不是冗长道歉。比如，它可以说：“我找到了两个叫 Alex 的联系人。你想打给哪一个？”恢复路径还应支持免手动纠错，因为驾驶员可能无法触摸中控屏。如果语音恢复连续失败两次，兜底交互可以在驾驶负荷较低时呈现简短可点击列表。目标不是让助手显得聪明，而是让任务保持可理解、可撤回且安全。"
      }
    ],
    "sentenceBreakdowns": [
      {
        "sentence": "When the confidence score is high and the task is low risk, the system may act directly and provide brief auditory feedback.",
        "structure": "When + 条件从句, 主语 + may + 并列动词 act / provide。",
        "focus": "用 confidence score 和 task risk 解释系统何时可以直接执行。",
        "pattern": "When [system signal] is high and [task risk] is low, the system may [action] and [feedback]."
      },
      {
        "sentence": "A good confirmation repeats only the critical part of the request and asks the driver to approve it with a short answer.",
        "structure": "主语 + repeats only... + and asks...to approve...，两个动作并列描述确认策略。",
        "focus": "强调确认不应复述全部内容，而应聚焦关键槽位。",
        "pattern": "A good confirmation repeats only [critical item] and asks [user] to approve it with [simple response]."
      },
      {
        "sentence": "If the system is unsure, it should use a clarification prompt instead of a long apology.",
        "structure": "If 条件从句 + should use...instead of...，表达推荐做法和避免做法。",
        "focus": "适合在评审中说明错误恢复文案应直接帮助用户继续任务。",
        "pattern": "If [system] is unsure, it should use [helpful prompt] instead of [unhelpful response]."
      },
      {
        "sentence": "The goal is not to make the assistant sound clever; the goal is to keep the task understandable, reversible, and safe.",
        "structure": "not to..., the goal is to...，用对比结构明确设计目标。",
        "focus": "说明智能座舱语音体验的核心不是拟人化，而是任务安全与可控。",
        "pattern": "The goal is not to [surface quality]; the goal is to keep [task/system] [adjective list]."
      }
    ],
    "practiceSteps": [
      {
        "title": "词汇朗读",
        "time": "5 分钟",
        "task": "朗读 10 个核心词汇，重点区分 confirmation、clarification、correction 和 recovery 的含义，并用每个词造一个座舱语音场景短句。"
      },
      {
        "title": "长文跟读",
        "time": "7 分钟",
        "task": "先听自己朗读一遍长文，再按句子分段跟读，注意 confidence score、low risk、fallback interaction 等短语的重音。"
      },
      {
        "title": "句子拆解",
        "time": "5 分钟",
        "task": "复述 4 条重点句结构，把 pattern 中的占位内容替换成导航、电话、空调或座椅设置场景。"
      },
      {
        "title": "口头复述与改写",
        "time": "6 分钟",
        "task": "用英语向同事解释“语音助手误识别后应该如何恢复任务”，要求包含 confirmation、clarification prompt 和 hands-free correction。"
      }
    ],
    "videos": []
  },
  {
    "id": "2026-07-07-notification-priority",
    "date": "2026-07-07",
    "title": "Notification priority and attention management in the intelligent cockpit",
    "topic": "智能座舱通知优先级与驾驶注意力管理",
    "suggestedTime": "20-25 分钟",
    "summary": "今天练习如何用英语描述车载通知分级、打断控制、驾驶注意力和可扫视反馈，适合用于 HMI 评审、告警策略讨论和智能座舱信息架构沟通。",
    "words": [
      {
        "term": "notification priority",
        "phonetic": "/ˌnoʊtɪfɪˈkeɪʃn praɪˈɔːrəti/",
        "meaning": "通知优先级；根据安全性、时效性和用户任务对信息进行排序的规则",
        "example": "Notification priority helps the cockpit decide whether a message should interrupt navigation or wait in the background.",
        "chineseExample": "通知优先级帮助座舱判断一条消息应打断导航，还是在后台等待。"
      },
      {
        "term": "attention management",
        "phonetic": "/əˈtenʃn ˈmænɪdʒmənt/",
        "meaning": "注意力管理；在驾驶任务和车载信息之间合理分配用户注意力的设计方法",
        "example": "Attention management is essential when the interface shows alerts during a complex driving maneuver.",
        "chineseExample": "当界面在复杂驾驶动作中显示告警时，注意力管理非常关键。"
      },
      {
        "term": "interruptive alert",
        "phonetic": "/ˌɪntəˈrʌptɪv əˈlɜːrt/",
        "meaning": "打断式告警；主动吸引用户注意并中断当前任务的信息提示",
        "example": "An interruptive alert should be reserved for urgent safety or system status changes.",
        "chineseExample": "打断式告警应保留给紧急安全信息或系统状态变化。"
      },
      {
        "term": "deferred notification",
        "phonetic": "/dɪˈfɜːrd ˌnoʊtɪfɪˈkeɪʃn/",
        "meaning": "延后通知；暂不打断驾驶任务、等到合适时机再呈现的信息",
        "example": "A deferred notification can appear after the vehicle leaves a dense intersection.",
        "chineseExample": "延后通知可以在车辆离开复杂路口后再出现。"
      },
      {
        "term": "driver workload",
        "phonetic": "/ˈdraɪvər ˈwɜːrkloʊd/",
        "meaning": "驾驶员工作负荷；驾驶员在感知、判断和操作上承受的综合负担",
        "example": "The cockpit should reduce nonessential prompts when driver workload is high.",
        "chineseExample": "当驾驶员工作负荷较高时，座舱应减少非必要提示。"
      },
      {
        "term": "context-aware timing",
        "phonetic": "/ˈkɑːntekst əˈwer ˈtaɪmɪŋ/",
        "meaning": "情境感知时机；根据道路、速度、任务和用户状态选择通知呈现时间",
        "example": "Context-aware timing prevents a low-priority media suggestion from appearing during lane guidance.",
        "chineseExample": "情境感知时机可以避免低优先级媒体推荐在车道引导期间出现。"
      },
      {
        "term": "noncritical prompt",
        "phonetic": "/ˌnɑːnˈkrɪtɪkl prɑːmpt/",
        "meaning": "非关键提示；不影响安全或当前驾驶目标、可被延后处理的信息",
        "example": "A noncritical prompt should stay quiet until the driver reaches a lower-demand moment.",
        "chineseExample": "非关键提示应保持安静，直到驾驶员进入负荷较低的时刻。"
      },
      {
        "term": "escalation rule",
        "phonetic": "/ˌeskəˈleɪʃn ruːl/",
        "meaning": "升级规则；当信息变得更紧急或多次未被处理时提高提示强度的规则",
        "example": "The escalation rule changes a silent banner into an audible alert only when the issue becomes time-sensitive.",
        "chineseExample": "升级规则只在问题变得有时效性时，才把静默横幅变成声音告警。"
      },
      {
        "term": "glance duration",
        "phonetic": "/ɡlæns duˈreɪʃn/",
        "meaning": "扫视时长；驾驶员为了理解界面信息而离开道路视线的时间",
        "example": "Short glance duration is a practical goal for notification copy, icon design, and placement.",
        "chineseExample": "较短扫视时长是通知文案、图标设计和位置布局的实际目标。"
      },
      {
        "term": "alert fatigue",
        "phonetic": "/əˈlɜːrt fəˈtiːɡ/",
        "meaning": "告警疲劳；过多或过弱相关的提示使用户开始忽视重要告警的现象",
        "example": "Alert fatigue increases when every service message uses the same visual weight as a safety warning.",
        "chineseExample": "当每条服务消息都使用和安全警告一样的视觉重量时，告警疲劳会增加。"
      }
    ],
    "glossary": [
      {
        "term": "notification",
        "phonetic": "/ˌnoʊtɪfɪˈkeɪʃn/",
        "meaning": "通知；系统向用户传递的信息提示",
        "example": "The notification should explain the next useful action.",
        "chineseExample": "通知应说明下一步有用操作。"
      },
      {
        "term": "priority",
        "phonetic": "/praɪˈɔːrəti/",
        "meaning": "优先级；决定信息先后和强弱的等级",
        "example": "Priority affects timing, sound, and visual weight.",
        "chineseExample": "优先级会影响时机、声音和视觉重量。"
      },
      {
        "term": "attention",
        "phonetic": "/əˈtenʃn/",
        "meaning": "注意力；用户用于观察、理解和决策的认知资源",
        "example": "Driving attention should remain on the road.",
        "chineseExample": "驾驶注意力应保持在道路上。"
      },
      {
        "term": "management",
        "phonetic": "/ˈmænɪdʒmənt/",
        "meaning": "管理；对资源、流程或状态进行控制和安排",
        "example": "Good management of alerts reduces unnecessary distraction.",
        "chineseExample": "良好的告警管理可以减少不必要分心。"
      },
      {
        "term": "intelligent cockpit",
        "phonetic": "/ɪnˈtelɪdʒənt ˈkɑːkpɪt/",
        "meaning": "智能座舱；整合显示、感知、服务和交互的车内数字空间",
        "example": "The intelligent cockpit should adapt notifications to the driving context.",
        "chineseExample": "智能座舱应根据驾驶情境调整通知。"
      },
      {
        "term": "message",
        "phonetic": "/ˈmesɪdʒ/",
        "meaning": "消息；需要传递给用户的一段信息",
        "example": "A service message may wait until the trip is stable.",
        "chineseExample": "服务消息可以等到行程稳定时再出现。"
      },
      {
        "term": "interrupt",
        "phonetic": "/ˌɪntəˈrʌpt/",
        "meaning": "打断；中止用户当前注意或任务",
        "example": "The system should not interrupt a lane change with a media tip.",
        "chineseExample": "系统不应在变道时用媒体提示打断用户。"
      },
      {
        "term": "navigation",
        "phonetic": "/ˌnævɪˈɡeɪʃn/",
        "meaning": "导航；引导车辆到达目的地的功能",
        "example": "Navigation instructions need clear priority near a junction.",
        "chineseExample": "导航指令在路口附近需要清晰优先级。"
      },
      {
        "term": "background",
        "phonetic": "/ˈbækɡraʊnd/",
        "meaning": "后台；不立即占用用户注意的位置或状态",
        "example": "Low-priority notifications can remain in the background.",
        "chineseExample": "低优先级通知可以留在后台。"
      },
      {
        "term": "alert",
        "phonetic": "/əˈlɜːrt/",
        "meaning": "告警；提示风险、状态变化或需要处理的问题",
        "example": "An alert should communicate urgency without creating panic.",
        "chineseExample": "告警应传达紧急程度，但不制造恐慌。"
      },
      {
        "term": "urgent",
        "phonetic": "/ˈɜːrdʒənt/",
        "meaning": "紧急的；需要立即关注或处理的",
        "example": "Urgent warnings deserve stronger multimodal feedback.",
        "chineseExample": "紧急警告需要更强的多模态反馈。"
      },
      {
        "term": "safety",
        "phonetic": "/ˈseɪfti/",
        "meaning": "安全；避免风险和伤害的状态或目标",
        "example": "Safety information should outrank comfort suggestions.",
        "chineseExample": "安全信息应高于舒适性建议。"
      },
      {
        "term": "system status",
        "phonetic": "/ˈsɪstəm ˈsteɪtəs/",
        "meaning": "系统状态；车辆或座舱功能当前是否正常、受限或需处理",
        "example": "System status changes may require immediate driver awareness.",
        "chineseExample": "系统状态变化可能需要驾驶员立即知晓。"
      },
      {
        "term": "deferred",
        "phonetic": "/dɪˈfɜːrd/",
        "meaning": "延后的；被安排在稍后处理的",
        "example": "Deferred content should still be easy to find later.",
        "chineseExample": "延后的内容稍后仍应容易找到。"
      },
      {
        "term": "vehicle",
        "phonetic": "/ˈviːəkl/",
        "meaning": "车辆；汽车或其他交通工具",
        "example": "The vehicle can delay prompts during demanding maneuvers.",
        "chineseExample": "车辆可以在高负荷操作期间延后提示。"
      },
      {
        "term": "intersection",
        "phonetic": "/ˌɪntərˈsekʃn/",
        "meaning": "路口；道路交汇、驾驶任务通常更复杂的位置",
        "example": "A dense intersection is not a good moment for promotional content.",
        "chineseExample": "复杂路口不适合展示推广内容。"
      },
      {
        "term": "driver workload",
        "phonetic": "/ˈdraɪvər ˈwɜːrkloʊd/",
        "meaning": "驾驶员工作负荷；驾驶员在感知、判断和操作上承受的综合负担",
        "example": "Driver workload rises when traffic, navigation, and alerts compete.",
        "chineseExample": "当交通、导航和告警相互争夺注意时，驾驶员工作负荷会上升。"
      },
      {
        "term": "nonessential",
        "phonetic": "/ˌnɑːnɪˈsenʃl/",
        "meaning": "非必要的；不是当前任务必须处理的",
        "example": "Nonessential prompts can be muted while the car is merging.",
        "chineseExample": "车辆并线时，非必要提示可以被静音。"
      },
      {
        "term": "prompt",
        "phonetic": "/prɑːmpt/",
        "meaning": "提示；引导用户注意、确认或操作的信息",
        "example": "A prompt should use direct language and one clear action.",
        "chineseExample": "提示应使用直接语言和一个清晰动作。"
      },
      {
        "term": "context-aware",
        "phonetic": "/ˈkɑːntekst əˈwer/",
        "meaning": "情境感知的；能根据环境和任务状态调整行为的",
        "example": "Context-aware design changes the notification behavior by road condition.",
        "chineseExample": "情境感知设计会根据道路状况改变通知行为。"
      },
      {
        "term": "timing",
        "phonetic": "/ˈtaɪmɪŋ/",
        "meaning": "时机；信息出现的时间点",
        "example": "Timing can make the same message helpful or distracting.",
        "chineseExample": "时机会让同一条消息变得有帮助或造成分心。"
      },
      {
        "term": "media suggestion",
        "phonetic": "/ˈmiːdiə səˈdʒestʃən/",
        "meaning": "媒体推荐；音乐、电台或内容服务的推荐提示",
        "example": "A media suggestion is usually lower priority than lane guidance.",
        "chineseExample": "媒体推荐通常低于车道引导的优先级。"
      },
      {
        "term": "lane guidance",
        "phonetic": "/leɪn ˈɡaɪdns/",
        "meaning": "车道引导；提示驾驶员选择正确车道的导航信息",
        "example": "Lane guidance should stay visible before a complicated turn.",
        "chineseExample": "复杂转弯前，车道引导应保持可见。"
      },
      {
        "term": "lower-demand moment",
        "phonetic": "/ˈloʊər dɪˈmænd ˈmoʊmənt/",
        "meaning": "较低负荷时刻；驾驶任务较简单、较适合处理次要信息的时间点",
        "example": "The assistant can surface reminders at a lower-demand moment.",
        "chineseExample": "助手可以在较低负荷时刻呈现提醒。"
      },
      {
        "term": "escalation",
        "phonetic": "/ˌeskəˈleɪʃn/",
        "meaning": "升级；提高提示强度、渠道或紧急程度",
        "example": "Escalation should be based on risk, not impatience.",
        "chineseExample": "升级应基于风险，而不是系统急于获得回应。"
      },
      {
        "term": "rule",
        "phonetic": "/ruːl/",
        "meaning": "规则；定义系统何时做出某种行为的条件",
        "example": "A rule can prevent repeated alerts from becoming noise.",
        "chineseExample": "规则可以避免重复告警变成噪音。"
      },
      {
        "term": "silent banner",
        "phonetic": "/ˈsaɪlənt ˈbænər/",
        "meaning": "静默横幅；不发声、以轻量视觉方式呈现的信息条",
        "example": "A silent banner is suitable for a tire-pressure reminder that is not immediate.",
        "chineseExample": "静默横幅适合显示并非立即紧急的胎压提醒。"
      },
      {
        "term": "audible alert",
        "phonetic": "/ˈɔːdəbl əˈlɜːrt/",
        "meaning": "声音告警；通过声音吸引用户注意的提示",
        "example": "An audible alert should be distinctive but not startling.",
        "chineseExample": "声音告警应有辨识度，但不能令人惊吓。"
      },
      {
        "term": "time-sensitive",
        "phonetic": "/ˈtaɪm sensətɪv/",
        "meaning": "有时效性的；需要在短时间内处理的",
        "example": "Time-sensitive information can justify stronger interruption.",
        "chineseExample": "有时效性的信息可以合理使用更强打断。"
      },
      {
        "term": "glance",
        "phonetic": "/ɡlæns/",
        "meaning": "扫视；短暂看一眼以获取信息",
        "example": "A glance should be enough to understand the warning category.",
        "chineseExample": "扫视一眼应足以理解警告类别。"
      },
      {
        "term": "duration",
        "phonetic": "/duˈreɪʃn/",
        "meaning": "持续时间；某个动作或状态维持的时长",
        "example": "Long duration away from the road increases risk.",
        "chineseExample": "长时间离开道路视线会增加风险。"
      },
      {
        "term": "copy",
        "phonetic": "/ˈkɑːpi/",
        "meaning": "文案；界面中用于说明、提示或引导的文字",
        "example": "Notification copy should avoid vague verbs.",
        "chineseExample": "通知文案应避免含糊动词。"
      },
      {
        "term": "icon design",
        "phonetic": "/ˈaɪkɑːn dɪˈzaɪn/",
        "meaning": "图标设计；用视觉符号表达功能或状态的设计",
        "example": "Icon design supports faster recognition under time pressure.",
        "chineseExample": "图标设计支持用户在时间压力下更快识别。"
      },
      {
        "term": "placement",
        "phonetic": "/ˈpleɪsmənt/",
        "meaning": "位置布局；元素在界面中的摆放位置",
        "example": "Placement affects whether an alert is noticed without hiding the map.",
        "chineseExample": "位置布局会影响告警是否被注意到，同时不遮挡地图。"
      },
      {
        "term": "alert fatigue",
        "phonetic": "/əˈlɜːrt fəˈtiːɡ/",
        "meaning": "告警疲劳；过多提示导致用户忽视重要信息的现象",
        "example": "Alert fatigue makes real warnings less effective.",
        "chineseExample": "告警疲劳会让真正的警告效果变弱。"
      },
      {
        "term": "visual weight",
        "phonetic": "/ˈvɪʒuəl weɪt/",
        "meaning": "视觉重量；界面元素吸引注意的强弱程度",
        "example": "Visual weight should match the risk level of the message.",
        "chineseExample": "视觉重量应匹配消息的风险等级。"
      }
    ],
    "longReadings": [
      {
        "title": "Prioritizing notifications without stealing attention",
        "text": "In an intelligent cockpit, a notification is not just a message; it is a request for attention. The HMI team should decide which requests deserve immediate interruption and which ones can wait. Safety warnings, system failures, and time-sensitive navigation instructions may need sound, color, and a clear next action. A music recommendation, a service promotion, or a general reminder should usually stay quiet when the driver is turning, merging, or approaching a dense intersection. Good notification design starts with priority, but it also depends on context-aware timing. The same low-battery phone reminder may be useful on a straight highway and distracting during lane guidance. Designers should define escalation rules so that a silent banner becomes an audible alert only when risk or urgency increases. They should also measure glance duration and reduce copy to the few words that support action. A review log can show which alerts were postponed, dismissed, or escalated during real trips. When every message looks urgent, drivers learn to ignore the interface. When priority, timing, and visual weight are aligned, the cockpit protects attention while still keeping the driver informed.",
        "translation": "在智能座舱中，通知不只是一条消息，而是一次对注意力的请求。HMI 团队应判断哪些请求值得立即打断，哪些可以等待。安全警告、系统故障和有时效性的导航指令可能需要声音、颜色和清晰的下一步动作。音乐推荐、服务推广或普通提醒，在驾驶员转弯、并线或接近复杂路口时通常应保持安静。优秀的通知设计始于优先级，但也依赖情境感知时机。同一条手机低电量提醒，在笔直高速上可能有用，在车道引导期间则可能造成分心。设计师应定义升级规则，让静默横幅只在风险或紧急程度上升时变为声音告警。他们还应衡量扫视时长，并把文案压缩到能支持行动的少数词语。评审日志可以展示真实行程中哪些告警被延后、忽略或升级。当每条消息看起来都很紧急时，驾驶员会学会忽视界面。当优先级、时机和视觉重量保持一致时，座舱既能保护注意力，也能让驾驶员保持知情。",
        "source": {
          "label": "原创练习文本：基于车载 HMI 通知分级和注意力管理场景",
          "url": ""
        }
      }
    ],
    "sentenceBreakdowns": [
      {
        "sentence": "In an intelligent cockpit, a notification is not just a message; it is a request for attention.",
        "structure": "地点状语 In an intelligent cockpit + not just...; it is... 用分号连接解释性并列句。",
        "focus": "用 not just A; it is B 重新定义一个设计对象，适合评审开场。",
        "pattern": "In X, Y is not just A; it is B."
      },
      {
        "sentence": "The HMI team should decide which requests deserve immediate interruption and which ones can wait.",
        "structure": "主句 The HMI team should decide + 两个 which 引导的宾语从句并列。",
        "focus": "用 deserve interruption / can wait 表达通知分级判断。",
        "pattern": "The team should decide which X deserve Y and which ones can Z."
      },
      {
        "sentence": "The same low-battery phone reminder may be useful on a straight highway and distracting during lane guidance.",
        "structure": "主语 The same reminder + may be + 两个并列表语 useful 和 distracting + 两个场景状语。",
        "focus": "强调同一信息在不同驾驶情境下可能产生相反体验。",
        "pattern": "The same X may be useful in A and distracting during B."
      },
      {
        "sentence": "When priority, timing, and visual weight are aligned, the cockpit protects attention while still keeping the driver informed.",
        "structure": "When 条件从句 + 主句 protects attention + while still doing 补充同步收益。",
        "focus": "用 are aligned 总结多个设计变量一致时的整体价值。",
        "pattern": "When A, B, and C are aligned, the system does X while still doing Y."
      }
    ],
    "practiceSteps": [
      {
        "title": "词汇朗读",
        "time": "5 分钟",
        "detail": "朗读 10 个核心词，重点区分 notification priority、interruptive alert、deferred notification 和 escalation rule 的适用场景。"
      },
      {
        "title": "长文跟读",
        "time": "7 分钟",
        "detail": "先逐句跟读英文长文，再用中文解释每一处与 safety、timing、visual weight 相关的设计判断。"
      },
      {
        "title": "句子拆解",
        "time": "5 分钟",
        "detail": "套用 4 个句型，把场景替换为导航提示、电话来电、充电提醒和媒体推荐，练习通知分级表达。"
      },
      {
        "title": "口头复述",
        "time": "5-8 分钟",
        "detail": "用英语复述一套座舱通知策略，至少使用 attention management、context-aware timing、glance duration 和 alert fatigue。"
      }
    ],
    "videos": []
  },
  {
    "id": "2026-07-06-multimodal-handoff",
    "date": "2026-07-06",
    "title": "Multimodal handoff between voice and touch in the intelligent cockpit",
    "topic": "智能座舱语音与触控的多模态任务交接",
    "suggestedTime": "20-25 分钟",
    "summary": "今天练习如何用英语描述语音、触控、视觉反馈和驾驶负荷之间的任务交接，适合用于座舱交互评审、原型讲解和安全体验讨论。",
    "words": [
      {
        "term": "multimodal handoff",
        "phonetic": "/ˌmʌltiˈmoʊdl ˈhændɔːf/",
        "meaning": "多模态交接；在语音、触控、视觉或物理控制之间平滑转移任务的设计方式",
        "example": "A multimodal handoff lets the driver start a destination search by voice and confirm the final route on the screen.",
        "chineseExample": "多模态交接让驾驶员可以用语音开始目的地搜索，并在屏幕上确认最终路线。"
      },
      {
        "term": "voice-first flow",
        "phonetic": "/vɔɪs fɜːrst floʊ/",
        "meaning": "语音优先流程；优先用语音完成输入，减少低价值触屏操作的交互路径",
        "example": "A voice-first flow is useful when the driver needs to keep both hands near the steering wheel.",
        "chineseExample": "当驾驶员需要双手靠近方向盘时，语音优先流程很有用。"
      },
      {
        "term": "visual-manual demand",
        "phonetic": "/ˈvɪʒuəl ˈmænjuəl dɪˈmænd/",
        "meaning": "视觉-手动需求；某项交互对看屏幕和动手操作造成的负荷",
        "example": "The design team reduced visual-manual demand by moving repeated climate adjustments into a short voice command.",
        "chineseExample": "设计团队通过把重复的空调调节移到简短语音命令中，降低了视觉-手动需求。"
      },
      {
        "term": "confirmation cue",
        "phonetic": "/ˌkɑːnfərˈmeɪʃn kjuː/",
        "meaning": "确认提示；用于告诉用户系统已理解、等待确认或即将执行的反馈信号",
        "example": "A clear confirmation cue prevents the cockpit from executing a misunderstood command silently.",
        "chineseExample": "清晰的确认提示可以避免座舱静默执行被误解的指令。"
      },
      {
        "term": "fallback interaction",
        "phonetic": "/ˈfɔːlbæk ˌɪntərˈækʃn/",
        "meaning": "兜底交互；当首选交互方式失败或不适合时提供的备用操作路径",
        "example": "Fallback interaction should be visible when speech recognition fails in a noisy cabin.",
        "chineseExample": "当嘈杂座舱中语音识别失败时，兜底交互应该清晰可见。"
      },
      {
        "term": "task continuity",
        "phonetic": "/tæsk ˌkɑːntəˈnuːəti/",
        "meaning": "任务连续性；用户切换输入方式后仍能保留上下文、进度和意图",
        "example": "Task continuity means the search query remains on screen after the driver switches from voice to touch.",
        "chineseExample": "任务连续性意味着驾驶员从语音切换到触控后，搜索词仍保留在屏幕上。"
      },
      {
        "term": "glanceable feedback",
        "phonetic": "/ˈɡlænsəbl ˈfiːdbæk/",
        "meaning": "可扫视反馈；驾驶员短暂看一眼就能理解的状态或结果提示",
        "example": "Glanceable feedback should summarize the command result without forcing the driver to read a long sentence.",
        "chineseExample": "可扫视反馈应概括命令结果，而不是迫使驾驶员阅读长句。"
      },
      {
        "term": "interaction recovery",
        "phonetic": "/ˌɪntərˈækʃn rɪˈkʌvəri/",
        "meaning": "交互恢复；在误识别、取消或中断后帮助用户回到可控状态的设计",
        "example": "Interaction recovery gives the driver a safe way to edit the route instead of restarting the entire task.",
        "chineseExample": "交互恢复为驾驶员提供安全修改路线的方法，而不必重新开始整个任务。"
      },
      {
        "term": "cognitive load",
        "phonetic": "/ˈkɑːɡnətɪv loʊd/",
        "meaning": "认知负荷；用户理解、记忆和决策时消耗的心理资源",
        "example": "The assistant should lower cognitive load by asking one concise question at a time.",
        "chineseExample": "助手应该一次只问一个简洁问题，以降低认知负荷。"
      },
      {
        "term": "mode awareness",
        "phonetic": "/moʊd əˈwernəs/",
        "meaning": "模式感知；用户知道系统当前处于监听、编辑、确认或执行等哪种状态",
        "example": "Mode awareness is critical when the cockpit moves from passive listening to active route guidance.",
        "chineseExample": "当座舱从被动监听进入主动路线引导时，模式感知非常关键。"
      }
    ],
    "glossary": [
      {
        "term": "multimodal",
        "phonetic": "/ˌmʌltiˈmoʊdl/",
        "meaning": "多模态的；结合多种输入或输出方式的",
        "example": "A multimodal cockpit combines speech, touch, visual feedback, and physical controls.",
        "chineseExample": "多模态座舱结合语音、触控、视觉反馈和物理控制。"
      },
      {
        "term": "handoff",
        "phonetic": "/ˈhændɔːf/",
        "meaning": "交接；任务或控制权从一种方式转到另一种方式",
        "example": "The handoff should preserve the driver intent.",
        "chineseExample": "交接应保留驾驶员意图。"
      },
      {
        "term": "voice",
        "phonetic": "/vɔɪs/",
        "meaning": "语音；通过说话完成输入或控制的方式",
        "example": "Voice can reduce touch steps during driving.",
        "chineseExample": "语音可以减少驾驶中的触控步骤。"
      },
      {
        "term": "touch",
        "phonetic": "/tʌtʃ/",
        "meaning": "触控；通过屏幕或触摸区域进行操作",
        "example": "Touch is efficient when choices need visual comparison.",
        "chineseExample": "当选项需要视觉比较时，触控很高效。"
      },
      {
        "term": "intelligent cockpit",
        "phonetic": "/ɪnˈtelɪdʒənt ˈkɑːkpɪt/",
        "meaning": "智能座舱；整合显示、感知、服务和交互的车内数字空间",
        "example": "The intelligent cockpit should adapt to the driving context.",
        "chineseExample": "智能座舱应适应驾驶情境。"
      },
      {
        "term": "destination search",
        "phonetic": "/ˌdestɪˈneɪʃn sɜːrtʃ/",
        "meaning": "目的地搜索；查找导航目的地的任务",
        "example": "Destination search often begins with an incomplete place name.",
        "chineseExample": "目的地搜索经常从不完整的地点名称开始。"
      },
      {
        "term": "route",
        "phonetic": "/ruːt/",
        "meaning": "路线；从当前位置到目的地的导航路径",
        "example": "The route should be confirmed before guidance starts.",
        "chineseExample": "路线应在导航开始前确认。"
      },
      {
        "term": "screen",
        "phonetic": "/skriːn/",
        "meaning": "屏幕；车内用于显示信息和操作界面的设备",
        "example": "The screen should show only the most relevant next action.",
        "chineseExample": "屏幕应只显示最相关的下一步操作。"
      },
      {
        "term": "steering wheel",
        "phonetic": "/ˈstɪrɪŋ wiːl/",
        "meaning": "方向盘；驾驶员控制车辆方向的部件",
        "example": "Hands should stay near the steering wheel during complex traffic.",
        "chineseExample": "复杂交通中双手应靠近方向盘。"
      },
      {
        "term": "visual",
        "phonetic": "/ˈvɪʒuəl/",
        "meaning": "视觉的；与看屏幕、图标或道路有关的",
        "example": "Visual feedback must be brief and easy to scan.",
        "chineseExample": "视觉反馈必须简短且易扫视。"
      },
      {
        "term": "manual",
        "phonetic": "/ˈmænjuəl/",
        "meaning": "手动的；需要手部操作的",
        "example": "Manual input can distract the driver if it requires many taps.",
        "chineseExample": "如果需要多次点击，手动输入可能分散驾驶员注意力。"
      },
      {
        "term": "demand",
        "phonetic": "/dɪˈmænd/",
        "meaning": "需求；某项任务对注意力、时间或动作造成的负荷",
        "example": "High demand tasks should wait until the vehicle is stopped.",
        "chineseExample": "高负荷任务应等车辆停止后再进行。"
      },
      {
        "term": "climate adjustment",
        "phonetic": "/ˈklaɪmət əˈdʒʌstmənt/",
        "meaning": "空调调节；温度、风量或出风模式的改变",
        "example": "Climate adjustment is a common cockpit micro-task.",
        "chineseExample": "空调调节是常见的座舱微任务。"
      },
      {
        "term": "command",
        "phonetic": "/kəˈmænd/",
        "meaning": "命令；用户要求系统执行的指令",
        "example": "The command must be short enough for reliable recognition.",
        "chineseExample": "命令必须足够简短，便于可靠识别。"
      },
      {
        "term": "confirmation",
        "phonetic": "/ˌkɑːnfərˈmeɪʃn/",
        "meaning": "确认；在执行前核对用户意图的步骤",
        "example": "Confirmation is necessary before changing a route.",
        "chineseExample": "更改路线前需要确认。"
      },
      {
        "term": "cue",
        "phonetic": "/kjuː/",
        "meaning": "提示；帮助用户理解状态或下一步的信号",
        "example": "A cue can be visual, auditory, or haptic.",
        "chineseExample": "提示可以是视觉、听觉或触觉的。"
      },
      {
        "term": "execute",
        "phonetic": "/ˈeksɪkjuːt/",
        "meaning": "执行；系统按用户意图完成动作",
        "example": "The system should execute only after the driver confirms.",
        "chineseExample": "系统应在驾驶员确认后才执行。"
      },
      {
        "term": "misunderstood",
        "phonetic": "/ˌmɪsʌndərˈstʊd/",
        "meaning": "被误解的；系统没有正确理解输入",
        "example": "A misunderstood command should be easy to correct.",
        "chineseExample": "被误解的命令应易于修正。"
      },
      {
        "term": "fallback",
        "phonetic": "/ˈfɔːlbæk/",
        "meaning": "备用方案；主流程失败时使用的替代路径",
        "example": "Fallback options prevent the user from getting stuck.",
        "chineseExample": "备用选项防止用户卡住。"
      },
      {
        "term": "speech recognition",
        "phonetic": "/spiːtʃ ˌrekəɡˈnɪʃn/",
        "meaning": "语音识别；系统把说话内容转成可处理文本或意图的能力",
        "example": "Speech recognition can struggle with road noise.",
        "chineseExample": "语音识别可能难以处理道路噪声。"
      },
      {
        "term": "noisy cabin",
        "phonetic": "/ˈnɔɪzi ˈkæbɪn/",
        "meaning": "嘈杂座舱；存在风噪、路噪、乘客说话等干扰的车内环境",
        "example": "A noisy cabin requires stronger recovery design.",
        "chineseExample": "嘈杂座舱需要更强的恢复设计。"
      },
      {
        "term": "continuity",
        "phonetic": "/ˌkɑːntəˈnuːəti/",
        "meaning": "连续性；任务在切换或中断后保持上下文的能力",
        "example": "Continuity reduces repeated input.",
        "chineseExample": "连续性减少重复输入。"
      },
      {
        "term": "search query",
        "phonetic": "/sɜːrtʃ ˈkwɪri/",
        "meaning": "搜索词；用户用于查找信息的输入内容",
        "example": "The search query should remain editable after voice input.",
        "chineseExample": "语音输入后，搜索词应仍可编辑。"
      },
      {
        "term": "glanceable",
        "phonetic": "/ˈɡlænsəbl/",
        "meaning": "可扫视的；短暂一看即可理解的",
        "example": "Glanceable content supports quick decisions.",
        "chineseExample": "可扫视内容支持快速决策。"
      },
      {
        "term": "feedback",
        "phonetic": "/ˈfiːdbæk/",
        "meaning": "反馈；系统对用户动作给出的响应信息",
        "example": "Feedback should show what changed and what remains pending.",
        "chineseExample": "反馈应显示已改变内容和待处理内容。"
      },
      {
        "term": "summarize",
        "phonetic": "/ˈsʌməraɪz/",
        "meaning": "概括；用更短的信息表达关键结果",
        "example": "The interface should summarize the command result.",
        "chineseExample": "界面应概括命令结果。"
      },
      {
        "term": "interaction",
        "phonetic": "/ˌɪntərˈækʃn/",
        "meaning": "交互；用户与系统之间的输入、反馈和状态变化",
        "example": "Every interaction should support the driving task.",
        "chineseExample": "每次交互都应支持驾驶任务。"
      },
      {
        "term": "recovery",
        "phonetic": "/rɪˈkʌvəri/",
        "meaning": "恢复；从错误、中断或取消状态回到可控流程",
        "example": "Recovery is part of a resilient cockpit experience.",
        "chineseExample": "恢复是韧性座舱体验的一部分。"
      },
      {
        "term": "edit",
        "phonetic": "/ˈedɪt/",
        "meaning": "编辑；修改已有输入或设置",
        "example": "The driver may need to edit a recognized destination.",
        "chineseExample": "驾驶员可能需要编辑已识别的目的地。"
      },
      {
        "term": "restart",
        "phonetic": "/ˌriːˈstɑːrt/",
        "meaning": "重新开始；从头执行任务",
        "example": "Restarting the task increases frustration and workload.",
        "chineseExample": "重新开始任务会增加挫败感和工作负荷。"
      },
      {
        "term": "cognitive",
        "phonetic": "/ˈkɑːɡnətɪv/",
        "meaning": "认知的；与理解、记忆和决策有关的",
        "example": "Cognitive effort rises when the system asks several questions at once.",
        "chineseExample": "当系统一次问多个问题时，认知负荷会上升。"
      },
      {
        "term": "load",
        "phonetic": "/loʊd/",
        "meaning": "负荷；完成任务所需的资源压力",
        "example": "Lower load helps the driver keep attention on the road.",
        "chineseExample": "较低负荷帮助驾驶员把注意力保持在道路上。"
      },
      {
        "term": "concise",
        "phonetic": "/kənˈsaɪs/",
        "meaning": "简洁的；用少量信息表达清楚",
        "example": "A concise prompt is easier to understand while driving.",
        "chineseExample": "简洁提示在驾驶中更容易理解。"
      },
      {
        "term": "mode",
        "phonetic": "/moʊd/",
        "meaning": "模式；系统当前的工作状态",
        "example": "The mode should be visible when voice input is active.",
        "chineseExample": "语音输入启用时，模式应可见。"
      },
      {
        "term": "awareness",
        "phonetic": "/əˈwernəs/",
        "meaning": "感知；用户对系统状态和变化的理解",
        "example": "Awareness prevents surprise when the assistant starts guidance.",
        "chineseExample": "当助手开始导航时，状态感知可以避免意外感。"
      },
      {
        "term": "listening",
        "phonetic": "/ˈlɪsənɪŋ/",
        "meaning": "监听；系统正在接收语音输入的状态",
        "example": "Listening indicators should not be ambiguous.",
        "chineseExample": "监听指示不应含糊。"
      },
      {
        "term": "route guidance",
        "phonetic": "/ruːt ˈɡaɪdns/",
        "meaning": "路线引导；导航系统提供的行驶提示",
        "example": "Route guidance begins after the destination is confirmed.",
        "chineseExample": "目的地确认后，路线引导开始。"
      }
    ],
    "longReadings": [
      {
        "title": "Designing handoffs that respect driving attention",
        "text": "A good intelligent cockpit does not force one interaction mode to handle every situation. Voice is powerful for quick intent, such as finding a nearby charger or changing the temperature, because it can keep the driver looking forward. Touch is still valuable when the driver needs to compare routes, review a list, or correct a recognized name. The design challenge is the handoff between these modes. If the driver says, \"Find a quiet cafe near the office,\" the screen should show a short ranked list, highlight the recognized query, and make the next action obvious. If recognition is uncertain, the cockpit should ask one concise confirmation question instead of opening a dense menu. During the handoff, task continuity matters: the query, filters, and previous choices should remain visible and editable. Feedback should be glanceable, with clear mode awareness for listening, editing, confirming, and executing. When the cabin is noisy or the command fails, fallback interaction must help the driver recover without restarting the task. A well-designed multimodal flow reduces visual-manual demand, lowers cognitive load, and gives the driver control over how to complete the same goal safely.",
        "translation": "优秀的智能座舱不应该强迫一种交互模式处理所有场景。语音适合表达快速意图，例如查找附近充电站或调节温度，因为它能让驾驶员继续看向前方。触控在比较路线、查看列表或修正识别名称时仍然有价值。真正的设计挑战在于这些模式之间的交接。如果驾驶员说“查找办公室附近安静的咖啡馆”，屏幕应展示简短排序列表，突出已识别的查询，并让下一步动作清晰可见。如果识别不确定，座舱应提出一个简洁确认问题，而不是打开密集菜单。交接过程中，任务连续性很重要：查询、筛选条件和之前选择应保持可见且可编辑。反馈应可扫视，并清楚呈现监听、编辑、确认和执行等模式。当座舱嘈杂或命令失败时，兜底交互必须帮助驾驶员恢复任务，而不是从头再来。设计良好的多模态流程可以降低视觉-手动需求和认知负荷，并让驾驶员安全地选择完成同一目标的方式。",
        "source": {
          "label": "参考：Designing Touchscreen Menu Interfaces for In-Vehicle Infotainment Systems",
          "url": "https://arxiv.org/abs/2404.11469"
        }
      }
    ],
    "sentenceBreakdowns": [
      {
        "sentence": "Voice is powerful for quick intent because it can keep the driver looking forward.",
        "structure": "主句 Voice is powerful + 介词短语 for quick intent + because 原因状语从句。",
        "focus": "用 because 解释为什么某种交互方式适合特定驾驶场景。",
        "pattern": "X is powerful for Y because it can Z."
      },
      {
        "sentence": "If recognition is uncertain, the cockpit should ask one concise confirmation question instead of opening a dense menu.",
        "structure": "If 条件从句 + 主句 should ask + one concise confirmation question + instead of 动名词短语。",
        "focus": "用 instead of 对比推荐方案和应避免方案，适合设计评审表达。",
        "pattern": "If X is uncertain, the system should Y instead of Z."
      },
      {
        "sentence": "During the handoff, task continuity matters: the query, filters, and previous choices should remain visible and editable.",
        "structure": "时间/场景状语 During the handoff + 主句 + 冒号解释具体要求。",
        "focus": "用冒号补充说明抽象设计原则的具体界面表现。",
        "pattern": "During X, Y matters: A, B, and C should remain D."
      },
      {
        "sentence": "A well-designed multimodal flow reduces visual-manual demand, lowers cognitive load, and gives the driver control.",
        "structure": "主语 A well-designed multimodal flow + 三个并列谓语 reduces, lowers, and gives。",
        "focus": "用并列动词总结设计价值，适合会议结论或方案汇报。",
        "pattern": "A well-designed X reduces Y, lowers Z, and gives users control."
      }
    ],
    "practiceSteps": [
      {
        "title": "词汇朗读",
        "time": "5 分钟",
        "detail": "朗读 10 个核心词汇，重点区分 handoff、fallback、feedback、confirmation 的含义和使用场景。"
      },
      {
        "title": "长文跟读",
        "time": "7 分钟",
        "detail": "先慢速跟读全文，再用正常语速复述 voice、touch 和 handoff 三个核心段落。"
      },
      {
        "title": "句子拆解",
        "time": "5 分钟",
        "detail": "套用 4 个句型，分别替换成导航、空调、媒体和电话场景，练习设计评审表达。"
      },
      {
        "title": "口头改写",
        "time": "5-8 分钟",
        "detail": "用自己的话说明一个“语音失败后切换到触控确认”的流程，至少使用 multimodal handoff、glanceable feedback 和 interaction recovery。"
      }
    ],
    "videos": []
  },
  {
    "id": "2026-07-05-privacy-aware-personalization",
    "date": "2026-07-05",
    "title": "Privacy-aware personalization in the intelligent cockpit",
    "topic": "智能座舱个性化与隐私透明度",
    "suggestedTime": "20-25 分钟",
    "summary": "今天练习如何用英语讨论座舱个性化、数据权限、用户信任和隐私透明度，适合用于产品方案、合规评审和跨团队沟通。",
    "words": [
      {
        "term": "privacy-aware personalization",
        "phonetic": "/ˈpraɪvəsi əˈwer ˌpɜːrsənələˈzeɪʃn/",
        "meaning": "隐私感知的个性化；在尊重用户数据边界和授权的前提下提供定制体验",
        "example": "Privacy-aware personalization adjusts the cockpit layout without exposing sensitive trip history.",
        "chineseExample": "隐私感知的个性化可以调整座舱布局，同时不暴露敏感的行程历史。"
      },
      {
        "term": "explicit consent",
        "phonetic": "/ɪkˈsplɪsɪt kənˈsent/",
        "meaning": "明确同意；用户清楚知情并主动授权数据使用",
        "example": "The vehicle should ask for explicit consent before sharing location-based preferences with cloud services.",
        "chineseExample": "车辆在把基于位置的偏好分享给云服务前，应该请求用户明确同意。"
      },
      {
        "term": "data minimization",
        "phonetic": "/ˈdeɪtə ˌmɪnɪməˈzeɪʃn/",
        "meaning": "数据最小化；只收集完成目标所必需的数据",
        "example": "Data minimization keeps the recommendation engine focused on useful signals instead of collecting every interaction.",
        "chineseExample": "数据最小化让推荐引擎聚焦有用信号，而不是收集每一次交互。"
      },
      {
        "term": "preference profile",
        "phonetic": "/ˈprefərəns ˈproʊfaɪl/",
        "meaning": "偏好画像；记录用户常用设置、内容偏好和交互习惯的数据集合",
        "example": "A preference profile can store climate settings, display themes, and preferred navigation views.",
        "chineseExample": "偏好画像可以保存空调设置、显示主题和偏好的导航视图。"
      },
      {
        "term": "permission dashboard",
        "phonetic": "/pərˈmɪʃn ˈdæʃbɔːrd/",
        "meaning": "权限看板；集中展示并管理数据权限的界面",
        "example": "A permission dashboard helps drivers review which cockpit features can access contacts or location data.",
        "chineseExample": "权限看板帮助驾驶员查看哪些座舱功能可以访问联系人或位置数据。"
      },
      {
        "term": "on-device processing",
        "phonetic": "/ɑːn dɪˈvaɪs ˈprɑːsesɪŋ/",
        "meaning": "端侧处理；在车辆或设备本地处理数据，减少上传需求",
        "example": "On-device processing can recognize routine seat adjustments without sending raw behavior data to the cloud.",
        "chineseExample": "端侧处理可以识别常规座椅调节，而不把原始行为数据发送到云端。"
      },
      {
        "term": "contextual recommendation",
        "phonetic": "/kənˈtekstʃuəl ˌrekəmenˈdeɪʃn/",
        "meaning": "情境化推荐；根据当前任务、场景和用户偏好给出的建议",
        "example": "A contextual recommendation should appear only when it supports the current driving task.",
        "chineseExample": "情境化推荐只应在支持当前驾驶任务时出现。"
      },
      {
        "term": "transparent control",
        "phonetic": "/trænsˈpærənt kənˈtroʊl/",
        "meaning": "透明控制；让用户清楚知道系统为何这样做，并能调整或关闭",
        "example": "Transparent control explains why the cockpit suggests a route and lets the driver disable that signal.",
        "chineseExample": "透明控制会解释座舱为何推荐某条路线，并允许驾驶员关闭该信号。"
      },
      {
        "term": "trust calibration",
        "phonetic": "/trʌst ˌkælɪˈbreɪʃn/",
        "meaning": "信任校准；让用户对系统能力、限制和数据使用形成准确预期",
        "example": "Trust calibration prevents users from assuming that every personalized prompt is safety-critical.",
        "chineseExample": "信任校准可以避免用户误以为每个个性化提示都与安全关键事件有关。"
      },
      {
        "term": "reset pathway",
        "phonetic": "/ˈriːset ˈpæθweɪ/",
        "meaning": "重置路径；让用户删除、恢复或重新设置个人数据的操作流程",
        "example": "A clear reset pathway is essential when a shared vehicle changes drivers.",
        "chineseExample": "当共享车辆更换驾驶员时，清晰的重置路径非常重要。"
      }
    ],
    "glossary": [
      {
        "term": "privacy",
        "phonetic": "/ˈpraɪvəsi/",
        "meaning": "隐私；用户对个人信息收集、使用和分享的控制权",
        "example": "Privacy must be treated as part of the cockpit experience.",
        "chineseExample": "隐私必须被视为座舱体验的一部分。"
      },
      {
        "term": "personalization",
        "phonetic": "/ˌpɜːrsənələˈzeɪʃn/",
        "meaning": "个性化；根据用户偏好调整界面或服务",
        "example": "Personalization should reduce effort, not create surprise.",
        "chineseExample": "个性化应该减少操作成本，而不是制造意外。"
      },
      {
        "term": "intelligent cockpit",
        "phonetic": "/ɪnˈtelɪdʒənt ˈkɑːkpɪt/",
        "meaning": "智能座舱；融合显示、交互、感知和服务的车内数字空间",
        "example": "The intelligent cockpit learns from repeated routines.",
        "chineseExample": "智能座舱会从重复的日常习惯中学习。"
      },
      {
        "term": "sensitive",
        "phonetic": "/ˈsensətɪv/",
        "meaning": "敏感的；涉及个人身份、位置或行为的信息属性",
        "example": "Trip history is sensitive because it can reveal daily routines.",
        "chineseExample": "行程历史是敏感信息，因为它可能揭示日常规律。"
      },
      {
        "term": "trip history",
        "phonetic": "/trɪp ˈhɪstəri/",
        "meaning": "行程历史；车辆过去路线、目的地和出行时间记录",
        "example": "Trip history should not be exposed in a shared profile.",
        "chineseExample": "行程历史不应暴露在共享画像中。"
      },
      {
        "term": "consent",
        "phonetic": "/kənˈsent/",
        "meaning": "同意；用户对某项数据使用的授权",
        "example": "Consent should be specific and easy to withdraw.",
        "chineseExample": "同意应该具体，并且易于撤回。"
      },
      {
        "term": "cloud service",
        "phonetic": "/klaʊd ˈsɜːrvɪs/",
        "meaning": "云服务；通过远程服务器提供的数据处理或功能服务",
        "example": "A cloud service may improve recommendations but increases data exposure.",
        "chineseExample": "云服务可能提升推荐效果，但也增加数据暴露。"
      },
      {
        "term": "recommendation engine",
        "phonetic": "/ˌrekəmenˈdeɪʃn ˈendʒɪn/",
        "meaning": "推荐引擎；根据数据生成建议的算法模块",
        "example": "The recommendation engine should use the least amount of data required.",
        "chineseExample": "推荐引擎应使用完成任务所需的最少数据。"
      },
      {
        "term": "interaction",
        "phonetic": "/ˌɪntərˈækʃn/",
        "meaning": "交互；用户与系统之间的操作和反馈过程",
        "example": "Every interaction can become a data signal.",
        "chineseExample": "每一次交互都可能成为数据信号。"
      },
      {
        "term": "signal",
        "phonetic": "/ˈsɪɡnəl/",
        "meaning": "信号；可用于判断意图、状态或偏好的数据线索",
        "example": "A useful signal should be connected to a clear user benefit.",
        "chineseExample": "有用信号应该对应清晰的用户收益。"
      },
      {
        "term": "profile",
        "phonetic": "/ˈproʊfaɪl/",
        "meaning": "画像；对用户偏好、状态或行为的结构化记录",
        "example": "A profile must be easy to inspect and reset.",
        "chineseExample": "画像必须易于查看和重置。"
      },
      {
        "term": "climate setting",
        "phonetic": "/ˈklaɪmət ˈsetɪŋ/",
        "meaning": "空调设置；温度、风量和通风相关偏好",
        "example": "Climate settings are common inputs for cockpit personalization.",
        "chineseExample": "空调设置是座舱个性化的常见输入。"
      },
      {
        "term": "display theme",
        "phonetic": "/dɪˈspleɪ θiːm/",
        "meaning": "显示主题；界面的颜色、亮度和视觉风格配置",
        "example": "The display theme may change by driver profile.",
        "chineseExample": "显示主题可能随驾驶员画像而变化。"
      },
      {
        "term": "navigation view",
        "phonetic": "/ˌnævɪˈɡeɪʃn vjuː/",
        "meaning": "导航视图；地图、路线和引导信息的呈现方式",
        "example": "A familiar navigation view helps the driver scan faster.",
        "chineseExample": "熟悉的导航视图能帮助驾驶员更快扫视。"
      },
      {
        "term": "permission",
        "phonetic": "/pərˈmɪʃn/",
        "meaning": "权限；系统访问某类数据或能力的许可",
        "example": "Permission choices should be visible before a feature is enabled.",
        "chineseExample": "功能启用前应该能看到权限选择。"
      },
      {
        "term": "dashboard",
        "phonetic": "/ˈdæʃbɔːrd/",
        "meaning": "看板；集中展示状态、选项或指标的界面",
        "example": "The dashboard summarizes active data permissions.",
        "chineseExample": "看板汇总当前启用的数据权限。"
      },
      {
        "term": "contacts",
        "phonetic": "/ˈkɑːntækts/",
        "meaning": "联系人；手机或账户中的通信对象信息",
        "example": "Contacts require careful handling in a shared vehicle.",
        "chineseExample": "联系人在共享车辆中需要谨慎处理。"
      },
      {
        "term": "location data",
        "phonetic": "/loʊˈkeɪʃn ˈdeɪtə/",
        "meaning": "位置数据；车辆或用户所在地点、路线和停留点信息",
        "example": "Location data can reveal home and work patterns.",
        "chineseExample": "位置数据可能揭示家庭和工作规律。"
      },
      {
        "term": "on-device",
        "phonetic": "/ɑːn dɪˈvaɪs/",
        "meaning": "端侧的；发生在本地设备或车辆内部的",
        "example": "On-device analysis can reduce unnecessary cloud transfer.",
        "chineseExample": "端侧分析可以减少不必要的云端传输。"
      },
      {
        "term": "processing",
        "phonetic": "/ˈprɑːsesɪŋ/",
        "meaning": "处理；对数据进行计算、识别、存储或转换",
        "example": "Processing should match the stated purpose.",
        "chineseExample": "数据处理应与声明目的相匹配。"
      },
      {
        "term": "raw behavior data",
        "phonetic": "/rɔː bɪˈheɪvjər ˈdeɪtə/",
        "meaning": "原始行为数据；未经聚合或脱敏的用户操作记录",
        "example": "Raw behavior data may be more revealing than a simple preference.",
        "chineseExample": "原始行为数据可能比简单偏好更能暴露用户信息。"
      },
      {
        "term": "cloud",
        "phonetic": "/klaʊd/",
        "meaning": "云端；远程服务器和网络服务环境",
        "example": "Not every cockpit decision needs the cloud.",
        "chineseExample": "并非每个座舱决策都需要云端。"
      },
      {
        "term": "contextual",
        "phonetic": "/kənˈtekstʃuəl/",
        "meaning": "情境化的；与当前环境、任务和用户状态相关的",
        "example": "A contextual prompt should fit the driving moment.",
        "chineseExample": "情境化提示应适合当下驾驶时刻。"
      },
      {
        "term": "driving task",
        "phonetic": "/ˈdraɪvɪŋ tæsk/",
        "meaning": "驾驶任务；与安全驾驶、导航或车辆控制相关的当前任务",
        "example": "A prompt should not interrupt the main driving task.",
        "chineseExample": "提示不应打断主要驾驶任务。"
      },
      {
        "term": "transparent",
        "phonetic": "/trænsˈpærənt/",
        "meaning": "透明的；用户能理解原因、范围和后果的",
        "example": "Transparent logic improves user confidence.",
        "chineseExample": "透明的逻辑会提升用户信心。"
      },
      {
        "term": "disable",
        "phonetic": "/dɪsˈeɪbl/",
        "meaning": "禁用；关闭某项功能、信号或权限",
        "example": "Drivers should be able to disable a nonessential data signal.",
        "chineseExample": "驾驶员应该能够禁用非必要数据信号。"
      },
      {
        "term": "trust",
        "phonetic": "/trʌst/",
        "meaning": "信任；用户对系统可靠性、意图和边界的判断",
        "example": "Trust grows when the system explains its choices.",
        "chineseExample": "当系统解释自己的选择时，信任会增加。"
      },
      {
        "term": "calibration",
        "phonetic": "/ˌkælɪˈbreɪʃn/",
        "meaning": "校准；让判断或预期与实际能力相匹配",
        "example": "Calibration keeps expectations realistic.",
        "chineseExample": "校准让预期保持现实。"
      },
      {
        "term": "prompt",
        "phonetic": "/prɑːmpt/",
        "meaning": "提示；系统向用户显示或播放的信息",
        "example": "A personalized prompt should be easy to dismiss.",
        "chineseExample": "个性化提示应该易于关闭。"
      },
      {
        "term": "safety-critical",
        "phonetic": "/ˈseɪfti ˈkrɪtɪkl/",
        "meaning": "安全关键的；与碰撞、接管或驾驶风险直接相关的",
        "example": "Safety-critical alerts require a stronger priority than comfort suggestions.",
        "chineseExample": "安全关键提醒应比舒适性建议拥有更高优先级。"
      },
      {
        "term": "reset",
        "phonetic": "/ˌriːˈset/",
        "meaning": "重置；删除、恢复或重新配置系统状态",
        "example": "Reset options should be visible before selling the vehicle.",
        "chineseExample": "出售车辆前应能看到重置选项。"
      },
      {
        "term": "shared vehicle",
        "phonetic": "/ʃerd ˈviːəkl/",
        "meaning": "共享车辆；由多个用户轮流使用的车辆",
        "example": "A shared vehicle needs strong profile separation.",
        "chineseExample": "共享车辆需要严格区分用户画像。"
      },
      {
        "term": "driver",
        "phonetic": "/ˈdraɪvər/",
        "meaning": "驾驶员；控制或监督车辆的人",
        "example": "The driver should remain in control of personal data choices.",
        "chineseExample": "驾驶员应保持对个人数据选择的控制。"
      },
      {
        "term": "explain",
        "phonetic": "/ɪkˈspleɪn/",
        "meaning": "解释；说明系统行为的原因或依据",
        "example": "The cockpit should explain why a preference was applied.",
        "chineseExample": "座舱应解释为什么应用某个偏好。"
      },
      {
        "term": "benefit",
        "phonetic": "/ˈbenɪfɪt/",
        "meaning": "收益；用户能感知到的价值或便利",
        "example": "A data request needs a clear user benefit.",
        "chineseExample": "数据请求需要清晰的用户收益。"
      },
      {
        "term": "withdraw",
        "phonetic": "/wɪðˈdrɔː/",
        "meaning": "撤回；取消先前授予的同意或权限",
        "example": "Users should be able to withdraw consent at any time.",
        "chineseExample": "用户应该能够随时撤回同意。"
      }
    ],
    "longReadings": [
      {
        "text": "Personalization can make an intelligent cockpit feel calm, familiar, and efficient, but it also changes the privacy responsibilities of the HMI team. A seat position, a favorite navigation view, a preferred temperature, or a repeated charging stop may look like small convenience data. Together, however, these signals can describe a driver's routine, relationships, and habits. A privacy-aware cockpit therefore needs more than a legal notice hidden in the settings menu. It should explain what data is used, why the data improves the experience, and whether the processing happens on the device or in the cloud. The interface should ask for explicit consent when a feature uses sensitive information such as contacts, location data, or trip history. It should also provide a simple permission dashboard where drivers can pause personalization, delete a profile, or reset the vehicle before sharing it with another person. Good personalization is not just accurate; it is understandable and reversible. When users can see the benefit, change the boundary, and withdraw consent without effort, the system feels less like surveillance and more like a respectful assistant. For HMI designers, privacy is not a separate compliance layer. It is part of interaction quality, trust calibration, and long-term user acceptance.",
        "translation": "个性化可以让智能座舱显得平静、熟悉且高效，但它也改变了 HMI 团队在隐私方面的责任。座椅位置、常用导航视图、偏好的温度或重复出现的充电停靠点，看起来只是小型便利数据。然而，这些信号组合在一起，可能描述驾驶员的日常规律、人际关系和习惯。因此，隐私感知的座舱需要的不只是藏在设置菜单里的法律声明。它应该解释使用了什么数据、为什么这些数据能改善体验，以及处理发生在端侧还是云端。当功能使用联系人、位置数据或行程历史等敏感信息时，界面应该请求明确同意。它还应该提供简单的权限看板，让驾驶员暂停个性化、删除画像，或在与他人共享车辆前重置车辆。好的个性化不只是准确，还要易懂且可撤回。当用户能看到收益、改变边界并轻松撤回同意时，系统就不再像监控，而更像一个尊重人的助手。对 HMI 设计师来说，隐私不是独立的合规层，而是交互质量、信任校准和长期用户接受度的一部分。",
        "source": {
          "label": "参考：Analyzing Privacy Implications of Data Collection in Android Automotive OS",
          "url": "https://arxiv.org/abs/2409.15561"
        }
      }
    ],
    "sentenceBreakdowns": [
      {
        "sentence": "Personalization can make an intelligent cockpit feel calm, familiar, and efficient, but it also changes the privacy responsibilities of the HMI team.",
        "structure": "主语 Personalization + can make + 宾语 cockpit + feel 形容词组；but 连接转折，说明隐私责任。",
        "focus": "calm, familiar, and efficient 描述体验价值；privacy responsibilities 表示隐私责任。",
        "pattern": "X can make Y feel A, B, and C, but it also changes Z."
      },
      {
        "sentence": "Together, however, these signals can describe a driver's routine, relationships, and habits.",
        "structure": "Together 作状语，however 表转折；主语 these signals + can describe + 三个并列宾语。",
        "focus": "signals 在这里指数据线索；routine, relationships, and habits 强调组合数据的敏感性。",
        "pattern": "Together, these signals can describe A, B, and C."
      },
      {
        "sentence": "It should explain what data is used, why the data improves the experience, and whether the processing happens on the device or in the cloud.",
        "structure": "should explain 后接三个宾语从句：what / why / whether，适合描述透明度要求。",
        "focus": "what data is used 说明范围；why...improves 说明价值；whether...on the device or in the cloud 说明处理位置。",
        "pattern": "The interface should explain what X is used, why X helps, and whether Y happens locally or remotely."
      },
      {
        "sentence": "Good personalization is not just accurate; it is understandable and reversible.",
        "structure": "not just...; it is... 用分号连接评价标准升级，从准确性扩展到可理解和可撤回。",
        "focus": "accurate 是准确；understandable 是易懂；reversible 是可撤回或可恢复。",
        "pattern": "Good X is not just A; it is B and C."
      }
    ],
    "practiceSteps": [
      {
        "title": "词汇朗读",
        "time": "5 分钟",
        "detail": "朗读 10 个核心术语，重点区分 consent、permission、profile、processing 的发音和含义。"
      },
      {
        "title": "长文跟读",
        "time": "8 分钟",
        "detail": "按意群跟读长文，遇到 what / why / whether 三连结构时放慢并重读。"
      },
      {
        "title": "句子拆解",
        "time": "6 分钟",
        "detail": "复述 4 个重点句型，尤其练习 Good X is not just A; it is B and C. 的评价表达。"
      },
      {
        "title": "口头复述/改写",
        "time": "6 分钟",
        "detail": "用 privacy-aware personalization、explicit consent、permission dashboard 描述一个座舱账号登录或共享车辆重置方案。"
      }
    ],
    "videos": []
  },
  {
    "id": "2026-07-04-context-aware-cockpit",
    "date": "2026-07-04",
    "title": "Context-aware cockpit interaction for safer decisions",
    "topic": "情境感知座舱交互",
    "suggestedTime": "20-25 分钟",
    "summary": "今天聚焦智能座舱如何根据驾驶状态、环境信息和用户意图调整界面优先级，适合积累设计评审和方案汇报表达。",
    "words": [
      {
        "term": "context-aware interface",
        "phonetic": "/ˈkɑːntekst əˈwer ˈɪntərfeɪs/",
        "meaning": "情境感知界面；能根据用户状态、环境和任务动态调整的界面",
        "example": "A context-aware interface can reduce visual demand when the vehicle enters a complex junction.",
        "chineseExample": "当车辆进入复杂路口时，情境感知界面可以降低视觉负担。"
      },
      {
        "term": "driver workload",
        "phonetic": "/ˈdraɪvər ˈwɜːrkloʊd/",
        "meaning": "驾驶员工作负荷；驾驶中认知、视觉和操作压力的总和",
        "example": "The team measured driver workload before adding another layer of alerts.",
        "chineseExample": "团队在增加另一层提醒之前，先测量了驾驶员工作负荷。"
      },
      {
        "term": "glanceability",
        "phonetic": "/ˌɡlænsəˈbɪləti/",
        "meaning": "一瞥可读性；用户短暂扫视即可理解信息的能力",
        "example": "Glanceability is critical for speed, range, and navigation prompts.",
        "chineseExample": "车速、续航和导航提示的一瞥可读性非常关键。"
      },
      {
        "term": "interaction priority",
        "phonetic": "/ˌɪntərˈækʃn praɪˈɔːrəti/",
        "meaning": "交互优先级；不同功能、提示或任务在界面中的优先顺序",
        "example": "Interaction priority should change when a safety-critical event is detected.",
        "chineseExample": "当检测到安全关键事件时，交互优先级应该发生变化。"
      },
      {
        "term": "takeover request",
        "phonetic": "/ˈteɪkoʊvər rɪˈkwest/",
        "meaning": "接管请求；自动驾驶或辅助驾驶系统要求驾驶员接管控制的提示",
        "example": "A takeover request must be clear across visual, auditory, and haptic channels.",
        "chineseExample": "接管请求必须在视觉、听觉和触觉通道上都足够清晰。"
      },
      {
        "term": "multimodal feedback",
        "phonetic": "/ˌmʌltiˈmoʊdl ˈfiːdbæk/",
        "meaning": "多模态反馈；通过视觉、声音、触觉等多个通道提供反馈",
        "example": "Multimodal feedback helps users confirm an action without staring at the screen.",
        "chineseExample": "多模态反馈帮助用户在不盯着屏幕的情况下确认操作。"
      },
      {
        "term": "information hierarchy",
        "phonetic": "/ˌɪnfərˈmeɪʃn ˈhaɪərɑːrki/",
        "meaning": "信息层级；界面信息按重要性和使用频率组织的结构",
        "example": "The information hierarchy separates driving-critical data from comfort controls.",
        "chineseExample": "信息层级把驾驶关键数据和舒适性控制区分开来。"
      },
      {
        "term": "cognitive friction",
        "phonetic": "/ˈkɑːɡnətɪv ˈfrɪkʃn/",
        "meaning": "认知阻力；用户理解、判断或完成任务时遇到的额外心理成本",
        "example": "Ambiguous icons create cognitive friction during time-sensitive tasks.",
        "chineseExample": "含义模糊的图标会在时间敏感任务中制造认知阻力。"
      },
      {
        "term": "progressive disclosure",
        "phonetic": "/prəˈɡresɪv dɪsˈkloʊʒər/",
        "meaning": "渐进披露；按需展示信息，避免一次性暴露过多选项",
        "example": "Progressive disclosure keeps advanced settings available but out of the main driving view.",
        "chineseExample": "渐进披露让高级设置保持可用，但不占据主要驾驶视图。"
      },
      {
        "term": "safety-critical alert",
        "phonetic": "/ˈseɪfti ˈkrɪtɪkl əˈlɜːrt/",
        "meaning": "安全关键提醒；与碰撞、接管、系统失效等高风险情境相关的提示",
        "example": "A safety-critical alert should never compete visually with entertainment content.",
        "chineseExample": "安全关键提醒不应该在视觉上与娱乐内容竞争。"
      }
    ],
    "glossary": [
      {
        "term": "well-designed",
        "phonetic": "/ˌwel dɪˈzaɪnd/",
        "meaning": "设计良好的；经过清晰目标和使用场景验证的",
        "example": "A well-designed cockpit reduces unnecessary steps.",
        "chineseExample": "设计良好的座舱会减少不必要的操作步骤。"
      },
      {
        "term": "intelligent",
        "phonetic": "/ɪnˈtelɪdʒənt/",
        "meaning": "智能的；能根据情境、数据或用户意图做出响应的",
        "example": "An intelligent system can adapt to the driving context.",
        "chineseExample": "智能系统可以适应驾驶情境。"
      },
      {
        "term": "cockpit",
        "phonetic": "/ˈkɑːkpɪt/",
        "meaning": "座舱；驾驶员和乘员与车辆系统交互的空间",
        "example": "The cockpit combines displays, controls, and feedback.",
        "chineseExample": "座舱整合了显示、控制和反馈。"
      },
      {
        "term": "function",
        "phonetic": "/ˈfʌŋkʃn/",
        "meaning": "功能；系统提供给用户完成任务的能力",
        "example": "Every function should have a clear user value.",
        "chineseExample": "每个功能都应该有清晰的用户价值。"
      },
      {
        "term": "larger",
        "phonetic": "/ˈlɑːrdʒər/",
        "meaning": "更大的；尺寸或范围更大",
        "example": "A larger screen does not automatically improve usability.",
        "chineseExample": "更大的屏幕并不一定自动提升可用性。"
      },
      {
        "term": "understand",
        "phonetic": "/ˌʌndərˈstænd/",
        "meaning": "理解；识别用户意图、任务或情境",
        "example": "The system should understand what the driver is trying to do.",
        "chineseExample": "系统应该理解驾驶员想要完成什么。"
      },
      {
        "term": "driving",
        "phonetic": "/ˈdraɪvɪŋ/",
        "meaning": "驾驶；与车辆行驶和道路环境相关的活动",
        "example": "Driving tasks must remain the primary focus.",
        "chineseExample": "驾驶任务必须始终是主要关注点。"
      },
      {
        "term": "context",
        "phonetic": "/ˈkɑːntekst/",
        "meaning": "情境；影响交互判断的环境、任务和用户状态",
        "example": "Context determines which information should be shown first.",
        "chineseExample": "情境决定哪些信息应该优先展示。"
      },
      {
        "term": "according",
        "phonetic": "/əˈkɔːrdɪŋ/",
        "meaning": "根据；依据某个条件或规则",
        "example": "The layout changes according to speed and road complexity.",
        "chineseExample": "布局会根据车速和道路复杂度变化。"
      },
      {
        "term": "moment",
        "phonetic": "/ˈmoʊmənt/",
        "meaning": "时刻；某个具体时间点或交互发生的瞬间",
        "example": "At that moment, the warning should be more prominent.",
        "chineseExample": "在那个时刻，警告应该更加突出。"
      },
      {
        "term": "cruising",
        "phonetic": "/ˈkruːzɪŋ/",
        "meaning": "巡航；车辆以较稳定状态行驶",
        "example": "When cruising, the interface can stay calm and minimal.",
        "chineseExample": "巡航时，界面可以保持克制和简洁。"
      },
      {
        "term": "range",
        "phonetic": "/reɪndʒ/",
        "meaning": "续航里程；车辆还能行驶的距离",
        "example": "Range should be visible without distracting the driver.",
        "chineseExample": "续航信息应可见但不分散驾驶员注意力。"
      },
      {
        "term": "media",
        "phonetic": "/ˈmiːdiə/",
        "meaning": "媒体；音乐、播客、视频等娱乐内容",
        "example": "Media controls should not compete with safety alerts.",
        "chineseExample": "媒体控制不应与安全提醒争夺注意力。"
      },
      {
        "term": "visible",
        "phonetic": "/ˈvɪzəbl/",
        "meaning": "可见的；用户无需搜索即可看到的",
        "example": "Critical status should remain visible in the main view.",
        "chineseExample": "关键状态应该在主视图中保持可见。"
      },
      {
        "term": "calm",
        "phonetic": "/kɑːm/",
        "meaning": "平静的、克制的；不制造干扰的界面状态",
        "example": "A calm interface helps drivers stay focused.",
        "chineseExample": "克制平静的界面帮助驾驶员保持专注。"
      },
      {
        "term": "approach",
        "phonetic": "/əˈproʊtʃ/",
        "meaning": "接近；车辆靠近某个位置或情境",
        "example": "As the vehicle approaches a junction, guidance becomes more important.",
        "chineseExample": "当车辆接近路口时，引导信息会变得更重要。"
      },
      {
        "term": "dense",
        "phonetic": "/dens/",
        "meaning": "密集的；交通、信息或视觉元素较多的",
        "example": "Dense traffic requires a simpler HMI layout.",
        "chineseExample": "密集交通需要更简洁的 HMI 布局。"
      },
      {
        "term": "intersection",
        "phonetic": "/ˌɪntərˈsekʃn/",
        "meaning": "路口；道路交汇处",
        "example": "At an intersection, lane guidance should be easy to read.",
        "chineseExample": "在路口，车道引导应该容易读取。"
      },
      {
        "term": "secondary",
        "phonetic": "/ˈsekənderi/",
        "meaning": "次要的；相对于驾驶主任务不那么关键的",
        "example": "Secondary choices should be reduced during complex driving.",
        "chineseExample": "复杂驾驶时应减少次要选项。"
      },
      {
        "term": "choice",
        "phonetic": "/tʃɔɪs/",
        "meaning": "选项；用户可以选择的功能入口或操作",
        "example": "Too many choices slow down decision-making.",
        "chineseExample": "过多选项会拖慢决策。"
      },
      {
        "term": "highlight",
        "phonetic": "/ˈhaɪlaɪt/",
        "meaning": "突出显示；让重要信息更醒目",
        "example": "The system should highlight the next lane instruction.",
        "chineseExample": "系统应该突出下一条车道指令。"
      },
      {
        "term": "lane",
        "phonetic": "/leɪn/",
        "meaning": "车道",
        "example": "Lane guidance helps the driver prepare earlier.",
        "chineseExample": "车道引导帮助驾驶员更早做准备。"
      },
      {
        "term": "guidance",
        "phonetic": "/ˈɡaɪdns/",
        "meaning": "引导；帮助用户完成判断或行动的信息",
        "example": "Clear guidance reduces uncertainty.",
        "chineseExample": "清晰引导可以减少不确定性。"
      },
      {
        "term": "perceive",
        "phonetic": "/pərˈsiːv/",
        "meaning": "感知、察觉；看见并理解信息",
        "example": "Alerts should be easy to perceive at a glance.",
        "chineseExample": "提醒应该能一眼被感知。"
      },
      {
        "term": "glance",
        "phonetic": "/ɡlæns/",
        "meaning": "一瞥；短暂扫视",
        "example": "The driver should understand the warning with one glance.",
        "chineseExample": "驾驶员应该能通过一瞥理解警告。"
      },
      {
        "term": "designer",
        "phonetic": "/dɪˈzaɪnər/",
        "meaning": "设计师；负责定义体验、结构和交互的人",
        "example": "The designer should consider workload, trust, and safety.",
        "chineseExample": "设计师应考虑负荷、信任和安全。"
      },
      {
        "term": "feature",
        "phonetic": "/ˈfiːtʃər/",
        "meaning": "功能特性；产品中可被用户使用或感知的能力",
        "example": "A feature is valuable only when it supports the task.",
        "chineseExample": "只有支持任务的功能才有价值。"
      },
      {
        "term": "impressive",
        "phonetic": "/ɪmˈpresɪv/",
        "meaning": "令人印象深刻的；看起来很强或很炫的",
        "example": "An impressive animation may still increase distraction.",
        "chineseExample": "炫酷动画仍可能增加分心。"
      },
      {
        "term": "support",
        "phonetic": "/səˈpɔːrt/",
        "meaning": "支持；帮助用户完成任务或降低负担",
        "example": "The interface should support quick decisions.",
        "chineseExample": "界面应该支持快速决策。"
      },
      {
        "term": "voice",
        "phonetic": "/vɔɪs/",
        "meaning": "语音；通过说话完成输入或反馈的交互通道",
        "example": "Voice interaction can reduce manual input.",
        "chineseExample": "语音交互可以减少手动输入。"
      },
      {
        "term": "haptic",
        "phonetic": "/ˈhæptɪk/",
        "meaning": "触觉的；通过震动、力反馈等触感传达信息的",
        "example": "Haptic feedback confirms the action without a long visual check.",
        "chineseExample": "触觉反馈无需长时间看屏即可确认操作。"
      },
      {
        "term": "command",
        "phonetic": "/kəˈmænd/",
        "meaning": "指令；用户发出的操作请求",
        "example": "The command should be confirmed immediately.",
        "chineseExample": "指令应该被即时确认。"
      },
      {
        "term": "immediate",
        "phonetic": "/ɪˈmiːdiət/",
        "meaning": "即时的；没有明显延迟的",
        "example": "Immediate feedback makes the interaction feel reliable.",
        "chineseExample": "即时反馈会让交互更可靠。"
      },
      {
        "term": "understandable",
        "phonetic": "/ˌʌndərˈstændəbl/",
        "meaning": "易懂的；不需要额外解释就能理解的",
        "example": "Warnings must be understandable under time pressure.",
        "chineseExample": "警告在时间压力下也必须易懂。"
      },
      {
        "term": "decorative",
        "phonetic": "/ˈdekəreɪtɪv/",
        "meaning": "装饰性的；主要用于视觉美化而非功能支持的",
        "example": "Decorative details should not hide important information.",
        "chineseExample": "装饰细节不应遮挡重要信息。"
      },
      {
        "term": "trust",
        "phonetic": "/trʌst/",
        "meaning": "信任；用户对系统可靠性和可预测性的判断",
        "example": "Consistent feedback builds trust in the cockpit system.",
        "chineseExample": "一致的反馈会建立用户对座舱系统的信任。"
      },
      {
        "term": "workload",
        "phonetic": "/ˈwɜːrkloʊd/",
        "meaning": "负荷；完成任务需要投入的认知、视觉和操作资源",
        "example": "A simpler flow reduces driver workload.",
        "chineseExample": "更简单的流程会降低驾驶员负荷。"
      }
    ],
    "longReadings": [
      {
        "text": "A well-designed intelligent cockpit does not simply place more functions on a larger screen. It understands the driving context and changes the interface according to what matters most at that moment. When the car is cruising on an open road, the system can keep navigation, range, and media controls visible but calm. When the vehicle approaches a dense intersection, the cockpit should reduce secondary choices, highlight lane guidance, and make safety-related alerts easier to perceive at a glance. For an HMI designer, the key question is not whether a feature is impressive, but whether it supports the driver with the right level of attention. Voice interaction, touch controls, steering-wheel shortcuts, and haptic feedback should work together as one interaction system. If the driver needs to confirm a command, the feedback should be immediate and understandable without forcing a long visual check. This is why information hierarchy, glanceability, and multimodal feedback are not decorative details. They are design decisions that shape trust, workload, and safety inside the vehicle.",
        "translation": "一个优秀的智能座舱并不是简单地把更多功能放到更大的屏幕上。它要理解驾驶情境，并根据当下最重要的事情调整界面。当车辆在开阔道路巡航时，系统可以让导航、续航和媒体控制保持可见但不打扰。当车辆接近复杂路口时，座舱应该减少次要选项，突出车道引导，让安全相关提醒更容易被一眼识别。对 HMI 设计师来说，关键问题不是功能是否炫酷，而是它是否用合适的注意力成本支持驾驶员。语音、触控、方向盘快捷操作和触觉反馈应该共同组成一个交互系统。如果驾驶员需要确认指令，反馈应当即时且易懂，而不是迫使用户长时间看屏幕。因此，信息层级、一瞥可读性和多模态反馈不是装饰细节，而是影响车内信任、负荷和安全的设计决策。",
        "source": {
          "label": "参考：A Brief Survey on Interactive Automotive UI",
          "url": "https://arxiv.org/abs/2105.14465"
        }
      }
    ],
    "sentenceBreakdowns": [
      {
        "sentence": "It understands the driving context and changes the interface according to what matters most at that moment.",
        "structure": "主语 It + 并列谓语 understands / changes + 宾语 context / interface + according to 引导依据。",
        "focus": "driving context 表示驾驶情境；what matters most 表示最重要的事情。",
        "pattern": "The system changes X according to Y. 可用于描述自适应界面逻辑。"
      },
      {
        "sentence": "The cockpit should reduce secondary choices, highlight lane guidance, and make safety-related alerts easier to perceive at a glance.",
        "structure": "should + 三个并列动词 reduce / highlight / make，表达设计策略组合。",
        "focus": "secondary choices 是次要选项；at a glance 是一眼即可。",
        "pattern": "The interface should reduce A, highlight B, and make C easier to perceive."
      },
      {
        "sentence": "The key question is not whether a feature is impressive, but whether it supports the driver with the right level of attention.",
        "structure": "not whether..., but whether... 对比句型，用于强调设计判断标准。",
        "focus": "impressive 强调视觉或技术冲击；right level of attention 强调合适注意力成本。",
        "pattern": "The key question is not whether X, but whether Y."
      },
      {
        "sentence": "They are design decisions that shape trust, workload, and safety inside the vehicle.",
        "structure": "主句 They are design decisions + that 定语从句说明影响对象。",
        "focus": "shape 在这里是影响、塑造；trust, workload, and safety 是设计评审常用维度。",
        "pattern": "These are design decisions that shape A, B, and C."
      }
    ],
    "practiceSteps": [
      {
        "title": "词汇朗读",
        "time": "5 分钟",
        "detail": "先读英文术语和音标，再用中文解释回忆含义。"
      },
      {
        "title": "长文跟读",
        "time": "8 分钟",
        "detail": "第一遍慢读理解，第二遍按意群跟读，第三遍尽量连贯复述。"
      },
      {
        "title": "句子拆解",
        "time": "6 分钟",
        "detail": "重点练习 not whether..., but whether... 和 reduce A, highlight B, make C easier to perceive。"
      },
      {
        "title": "口头改写",
        "time": "5 分钟",
        "detail": "用今天词汇描述一个车机首页或导航提醒的优化方案。"
      }
    ],
    "videos": []
  }
];
