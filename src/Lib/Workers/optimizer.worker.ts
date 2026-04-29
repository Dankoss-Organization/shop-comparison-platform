self.onmessage = (event: MessageEvent) => {
  console.log("⚙️ [Worker]: Отримав дані від головного потоку:", event.data);

  
  const mockResponse = {
    status: "success",
    message: "Worker mockup"
  };

  self.postMessage(mockResponse);
};

export {};