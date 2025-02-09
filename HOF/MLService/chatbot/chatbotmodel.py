import subprocess
import os

subprocess.run(["pip", "install", "-q", "langchain_google_genai"])
subprocess.run(["pip", "install", "-q", "langchain"])
subprocess.run(["pip", "install", "-q", "langchain_community"])


os.environ["LANGSMITH_TRACING"]="true"
os.environ["LANGSMITH_ENDPOINT"]="https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"]="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"
os.environ["LANGSMITH_PROJECT"]="chatbot_with_langchain"
os.environ["GOOGLE_API_KEY"]="AIzaSyAcdsJgbxSANeIimls4_CrCx27aC_RNSQs"

from langchain_google_genai import ChatGoogleGenerativeAI

model = ChatGoogleGenerativeAI(model="gemini-pro",convert_system_message_to_human=True)
# gemini-1.5-pro-001

model.invoke("hi").content

from langchain_core.output_parsers import StrOutputParser

parser= StrOutputParser()

parser.invoke(model.invoke("hi"))

from langchain_core.messages import HumanMessage

import warnings
warnings.filterwarnings("ignore")

while True:
  message = input("Write your query:")
  if message=="bye":
    print("Good Bye have a great day!")
    break
  else:
    print(parser.invoke(model.invoke([HumanMessage(content=message)])))

from langchain_core.chat_history import BaseChatMessageHistory

from langchain_core.chat_history import InMemoryChatMessageHistory

from langchain_core.runnables.history import RunnableWithMessageHistory

from langchain_core.messages import AIMessage

result = model.invoke(
    [
        HumanMessage(content="Hi! I'm Srushti"),
        AIMessage(content="Hello Srushti! How can I assist you today?"),
        HumanMessage(content="What's my name?")
    ]
)

parser.invoke(result)

store={}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

config = {"configurable": {"session_id": "firstchat"}}

model_with_memory=RunnableWithMessageHistory(model,get_session_history)

model_with_memory.invoke([HumanMessage(content="Hi! I'm Srushti")],config=config).content

model_with_memory.invoke([HumanMessage(content="what is my name?")],config=config).content

store

config = {"configurable": {"session_id": "secondtchat"}}

{'configurable': {'session_id': 'secondtchat'}}

{'configurable': {'session_id': 'secondtchat'}}

model_with_memory.invoke([HumanMessage(content="what is my name?")],config=config)
                         
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt=ChatPromptTemplate.from_messages(
    [
      ("system","You are a helpful assistant. Answer all questions to the best of your ability.",),
      MessagesPlaceholder(variable_name="messages"),
    ]
)

chain = prompt | model

chain.invoke({"messages": ["hi! I'm bob"]})

chain.invoke({"messages": [HumanMessage(content="hi! I'm bob")]}).content

chain.invoke({"messages": [HumanMessage(content="what is my name")]}).content

model_with_memory=RunnableWithMessageHistory(chain,get_session_history)

config = {"configurable": {"session_id": "thirdchat"}}

response=model_with_memory.invoke(
    [HumanMessage(content="Hi! I'm Jim"),
     ],config=config
)

response.content

response=model_with_memory.invoke(
    [HumanMessage(content="hi what is my name"),
     ],config=config
)
print(response.content)

response=model_with_memory.invoke(
    [HumanMessage(content="what is 2+2?"),
     ],config=config
)
print(response.content)

response=model_with_memory.invoke(
    [HumanMessage(content="who is a indian cricket team caption?"),
     ],config=config
)
print(response.content)

response=model_with_memory.invoke(
    [HumanMessage(content="what should i add in previous addition so that i will become 10?"),
     ],config=config
)
print(response.content)

response=model_with_memory.invoke(
    [HumanMessage(content="what is my name?"),
     ],config=config
)
print(response.content)

store

from langchain_core.messages import SystemMessage, trim_messages

trimmer = trim_messages(
    max_tokens=60,
    strategy="last",
    token_counter=model,
    include_system=True,
    allow_partial=False,
    start_on="human",
)

messages = [
    HumanMessage(content="hi! I'm bob"),
    AIMessage(content="hi!"),
    HumanMessage(content="I like vanilla ice cream"),
    AIMessage(content="nice"),
    HumanMessage(content="whats 2 + 2"),
    AIMessage(content="4"),
    HumanMessage(content="thanks"),
    AIMessage(content="no problem!"),
    HumanMessage(content="having fun?"),
    AIMessage(content="yes!"),
]

model.get_num_tokens_from_messages(messages)

trimmer.invoke(messages)

trimmed_message = trimmer.invoke(messages)

model.get_num_tokens_from_messages(trimmed_message)

prompt

prompt=ChatPromptTemplate.from_messages(
    [
      ("system","You are a helpful assistant. Answer all questions to the best of your ability.",),
      MessagesPlaceholder(variable_name="messages"),
    ]
)

messages

trimmed_message

trimmed_message+[HumanMessage(content="what's my name?")]

messages+[HumanMessage(content="what's my name?")]

from operator import itemgetter

from langchain_core.runnables import RunnablePassthrough

chain = (
    RunnablePassthrough.assign(messages=itemgetter("messages") | trimmer)
    | prompt
    | model
)

response = chain.invoke(
    {
        "messages": messages + [HumanMessage(content="what's my name?")],
        "language": "English",
    }
)
response.content


response = chain.invoke(
    {
        "messages": messages + [HumanMessage(content="what math problem did i ask")],
        "language": "English",
    }
)
response.content

model_with_memory = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="messages",
)

config = {"configurable": {"session_id": "fifthchat"}}

response = model_with_memory.invoke(
    {
        "messages": messages + [HumanMessage(content="whats my name?")],
        "language": "English",
    },
    config=config,
)

response.content

response = model_with_memory.invoke(
    {
        "messages": [HumanMessage(content="what math problem did i ask?")],
        "language": "English",
    },
    config=config,
)

response.content