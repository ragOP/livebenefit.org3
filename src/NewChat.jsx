import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import agent from "../src/assets/pic.png";
import tick from "../src/assets/tick2.png";
import deliver from "../src/assets/delivered.svg"
import {
  CheckCheck,
  EllipsisVertical,
  Paperclip,
  Phone,
  Send,
  SendHorizontalIcon,
} from "lucide-react";
import CallToActiondq2 from "./components/CallToActiondq2";
import NewCall from "./components/NewCall";
export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [finalMessage, setFinalMessage] = useState(false);
  const [switchNumber, setSwitchNumber] = useState(false);
  const messagesEndRef = useRef(null);

  const getFormattedTime = (timeString) => {
    return timeString.split(" ")[0].split(":").slice(0, 2).join(":");
  };

  useEffect(() => {
    const initialMessages = [
      {
        text: "Hola! 👋",
        sender: "bot",
      },
      {
        text: "Emily de este lado. Vamos a ver si calificas para un Plan de Seguro Médico Gratis — es rápido y solo toma 2 minutos.",
        sender: "bot",
        time: new Date().toTimeString(),
      },
      {
        text: "Toca ‘Sí’ para comenzar ⬇️",
        sender: "bot",
        options: ["👉 ¡Sí! Quiero reclamar"],
        time: new Date().toTimeString(),
      },
    ];
    addMessagesWithDelay(initialMessages);
  }, []);

  const addMessagesWithDelay = (botResponses) => {
    let delay = 0;
    setIsTyping(true);
    botResponses.forEach((response, index) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            ...response,
            time: new Date().toTimeString(),
            lastInSequence: index === botResponses.length - 1,
          },
        ]);
        if (index === botResponses.length - 1) {
          setIsTyping(false);
          if (response.options) setCurrentOptions(response.options);
          if (response.input) setShowInput(true);
        }
      }, (delay += 1500));
    });
  };

  const handleOptionClick = (option) => {
    if (option === "👉 ¡Sí! Quiero reclamar") {
      setMessages((prev) => [
        ...prev,
        { text: "Sí", sender: "user", time: new Date().toTimeString() },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: option, sender: "user", time: new Date().toTimeString() },
      ]);
    }
    setShowInput(false);
    setCurrentOptions([]);
    let botResponses = [];

    if (option === "👉 ¡Sí! Quiero reclamar") {
      botResponses = [
        {
          text: "¡Genial! Vamos a conseguirte el beneficio lo antes posible. Solo necesito hacerte un par de preguntas rápidas.",
          sender: "bot",
        },
        {
          text: "¿Tienes menos de 65 años?",
          sender: "bot",
          options: ["Sí, menos de 65", "No, más de 65"],
        },
      ];
    } else if (
      option === "Sí, menos de 65"
    ) {
      botResponses = [
        {
          text: "¿Vives en Estados Unidos?",
          sender: "bot",
          options: ["Sí ", "No "],
        },
      ];
    }else if (
      option === "No, más de 65"
    ) {
      botResponses = [
        {
          text: "Lamentablemente, no calificas para este Subsidio de Gastos.",
          sender: "bot",
        },
        {
          text: "PERO, basándome en lo que me has dicho, veo que calificas para una Tarjeta de Subsidio de Alimentos valuada en miles de dólares.",
          sender: "bot",
        },
        {
          text: "¿Te interesa reclamarla?",
          sender: "bot",
          options: [" Sí", " No"],
        },
      ];
    }
    else if (option === "Sí " || option === "No ") {
      botResponses = [
        {
          text: "¿Tienes Medicare o Medicaid?",
          sender: "bot",
          options: ["  Sí", "No"],
        },
      ];
    }else if (option === " Sí") {
      botResponses = [
        {
          text: "Genial, te he calificado para la Tarjeta de Subsidio de Alimentos, valuada en miles de dólares al año.",
          sender: "bot",
        },
        {
          text: "Esta tarjeta se puede usar en todos los supermercados y tiendas médicas de Estados Unidos.",
          sender: "bot",
        },
      ];
      setSwitchNumber(true);
      setTimeout(() => {
        setFinalMessage(true);
      }, 4000);
    }
    else if (option === "  Sí"){
    botResponses = [
      {
        text: "Lamentablemente, no calificas para este beneficio.",
        sender: "bot",
      },
      {
        text: "PERO, basándome en lo que me has dicho, veo que calificas para una Tarjeta de Regalo de Shein de $750 gratis.",
        sender: "bot",
      },
      {
        text: "¿Te interesa reclamarla?",
        sender: "bot",
        options: ["Sí, quiero reclamar", "No, prefiero pasar"],
      },
    ];
    }

    if (option === "Sí, quiero reclamar" || option === "No, prefiero pasar") {
      
      setTimeout(() => {
        window.location.href = "https://glstrck.com/aff_c?offer_id=710&aff_id=21983";
      }, 2000);
    }
    else if (option === " No"){
      botResponses = [
        {
          text: "Sorry you don’t qualify",
          sender: "bot",
        },
      ];
    }
    else if (option === "Sí" || option === "No") {
      botResponses = [
        {
          text: "🎉 ¡Noticias fantásticas! Estás a un paso de asegurar tu beneficio",
          sender: "bot",
        },
        {
          text: "Basándome en lo que me has dicho, ¡eres elegible para el subsidio de seguro médico gratis!",
          sender: "bot",
        },
      ];
      setTimeout(() => {
        setFinalMessage(true);
      }, 4000);
    }
    addMessagesWithDelay(botResponses);
  };

  const handleSendInput = () => {
    if (inputValue.trim() === "") return;
    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
    setInputValue("");
    setShowInput(false);
    let botResponses = [
      { text: `Nice to meet you, ${inputValue}!`, sender: "bot" },
      {
        text: "Let's begin your Soulmate Portrait.",
        sender: "bot",
        options: ["Start"],
      },
    ];
    addMessagesWithDelay(botResponses);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if(finalMessage){
        container.scrollTo({
          top: container.scrollHeight - container.clientHeight - 100,
          behavior: "smooth",
        });
      }else{
        container.scrollTo({
          top: container.scrollHeight - container.clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, finalMessage, isTyping]);
  
  
  return (
    <div
      className="w-full h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
      }}
    >
      <div className="bg-[#005e54] text-white p-4 flex items-center gap-2 shadow-md sticky top-0 right-0 left-0 z-10 h-16">
        <img
          src={agent}
          alt="Psychic Master"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-sm">Live Benefit Helpline</p>
              <img src={tick} className="w-4 h-4"  style={{marginLeft:"-6px"}}/>
            </div>
            <p className="text-sm ">online</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-white" />
            <Paperclip className="w-5 h-5 text-white" />
            <EllipsisVertical className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto flex flex-col mt-[1%] pb-52">
        {messages.map((msg, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "bot" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex relative ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && msg.lastInSequence && (
                <img
                  src={agent}
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 absolute bottom-0"
                />
              )}
              <motion.div
                initial={{ width: 0, height: 15 }}
                animate={{ width: "auto", height: "auto" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`pt-2 px-2 pb-0 rounded-lg text-base shadow-md ${
                  msg.sender === "user"
                    ? "bg-[#dcf8c6] text-gray-800"
                    : "bg-white text-gray-800 ms-10"
                }`}
                style={{ minWidth: "70px", overflow: "hidden" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {msg.text}
                </motion.span>

                <span className="flex flex-row-reverse gap-1 items-center">
                  {msg.sender === "user" && (
                    <img src={deliver} className="h-4 w-4" />
                  )}
                  <span className="text-[10px] text-gray-400">
                    {getFormattedTime(msg.time)}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <img src={agent} alt="Bot" className="w-8 h-8 rounded-full" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-xs p-2 rounded-lg text-sm bg-white text-gray-800 flex items-center gap-1"
            >
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            </motion.div>
          </motion.div>
        )}
        {showInput && (
          <div className="mt-2 flex items-center gap-2 justify-end">
            <input
              type="text"
              className="border w-[60vw] p-4 rounded-2xl"
              placeholder="Type your name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="px-5 py-4 bg-[#005e54] text-white rounded-2xl"
              onClick={handleSendInput}
            >
              <SendHorizontalIcon className="w-6 h-6" />
            </button>
          </div>
        )}
        {currentOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 items-center justify-start ms-10">
            {currentOptions.map((option, i) => (
              <button
                key={i}
                className="px-6 py-3 bg-[#005e54] text-white rounded-full text-lg"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {finalMessage && <NewCall finalMessage={finalMessage} switchNumber={switchNumber}/>}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}