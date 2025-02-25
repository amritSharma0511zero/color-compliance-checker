import { useEffect } from "react";

const AiBot = () => {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
    script.async = true;
    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL: "https://agent.jotform.com/01953b9a986a7fa9b2787530e5c4371ae77c",
          rootId: "JotformAgent-01953b9a986a7fa9b2787530e5c4371ae77c",
          formID: "01953b9a986a7fa9b2787530e5c4371ae77c",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
          buttonBackgroundColor: "#0066C3",
          buttonIconColor: "#FFFFFF",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            pulse: "Yes",
            position: "right",
          },
          isVoice: undefined,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default AiBot;
