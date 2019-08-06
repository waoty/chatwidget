function startWidgetChat(data){
    console.log("hola");
    //Identificar contenedor
    var container = document.getElementById("container");
      
      //Variable para identificar si se realizo la llamada de bienvenida
      var flg_start = false
  
    /* BUBBLE */
    //Dibujar contenedor burbuja
    var bubble = document.createElement("div");
    bubble.setAttribute("id", "bubble");
    bubble.className = "chatwidget-bubble";
    bubble.style.backgroundColor = data.primaryColor || "#001e37";
    bubble.onclick = open;
    //Dibujar contenedor del avatar en la burbuja
    var bubbleavatar = document.createElement("div");
    bubbleavatar.className = "chatwidget-bubble-avatar";
    bubble.appendChild(bubbleavatar);
    //Agregar imagen
    var imgb = document.createElement("img");
    imgb.src = data.urlAvatar;
    bubbleavatar.appendChild(imgb);
    //Agregar nombre del avatar
    var bubcontent = document.createElement("div");
    bubcontent.className = "chatwidget-bubble-content";
    var texto = document.createElement("p");
    texto.className = "chatwidget-bubble-title";
    texto.innerHTML = data.nameAV;
    bubcontent.appendChild(texto);
    bubble.appendChild(bubcontent);
    container.appendChild(bubble);
  
      /* CHAT CONTAINER */
      
    //Dibujar Ventana chat
    var containerWidget = document.createElement("div");
    containerWidget.className = "chatwidget-container";
      container.appendChild(containerWidget);
      
    //header ventana
    var header1 = document.createElement("header");
      header1.className = "chatwidget-header";
      
    //Agregar elementos para datos del asistente
    var div1 = document.createElement("div");
    div1.className = "chatwidget-assistant";
      header1.appendChild(div1);
      
    //agregar avatar
    var img = document.createElement("img");
    img.className = "chatwidget-assistant-avatar"
    img.src = data.urlAvatar;
    containerWidget.appendChild(header1);
      div1.appendChild(img);
      
    //agregar nombre y estado del AV
    var status_a = document.createElement("div");
    status_a.className = "chatwidget-assistant-info";
    div1.appendChild(status_a);
    var h1 = document.createElement("h1");
    h1.className = "chatwidget-assistant-info-title";
    h1.innerHTML = data.nameAV;
    status_a.appendChild(h1);
    var h2 = document.createElement("h2");
    h2.className = "chatwidget-assistant-info-status";
    h2.innerHTML = data.statusAV || "En línea";
      status_a.appendChild(h2);
  
      //Opción cerrar
      var div2 = document.createElement("div");
      div2.className = "chatwidget-toolbar";
      header1.appendChild(div2);
  
    var button_close = document.createElement("button");
    button_close.className = "chatwidget-toolbar-button chatwidget-toolbar-button-close";
    button_close.innerHTML = "x";
    button_close.onclick = close;
    div2.appendChild(button_close);
      
      //Dibujar content
      var content = document.createElement("div");
      content.className = "chatwidget-content";
      containerWidget.appendChild(content);
      
      //Dibujar divider
      var divider = document.createElement("div");
    divider.className = "chatwidget-divider";
      containerWidget.appendChild(divider);
      var hr = document.createElement("hr");
      divider.appendChild(hr);
      
      //Formulario
      var form = document.createElement("form");
    form.className = "chatwidget chatwidget-controls";
      containerWidget.appendChild(form);
      form.onsubmit = sendMessage

      var textarea = document.createElement("textarea");
      textarea.className = "chatwidget chatwidget-controls-textinput";
      textarea.setAttribute("rows","1");
      textarea.setAttribute("id","input-text");
      textarea.setAttribute("autocomplete","off");
      textarea.setAttribute("placeholder","Escribe tu mensaje");
      form.appendChild(textarea);
  
      var submit = document.createElement("button");
    submit.className = "chatwidget chatwidget-controls-submit";
      submit.setAttribute("type","submit");
      submit.onclick = sendMessage;
      var img_send = document.createElement("img");
      img_send.src ="images/send.png";
      submit.appendChild(img_send);
    form.appendChild(submit);
  
      /* FUNCIONES */
      //Abrir chat
    function open(){
          containerWidget.style.display = "flex"
          bubble.style.display = "none"
          startApplication({ message:"hola" })
      }
      //Cerrar chat
      function close(){
          containerWidget.style.display = "none";
          bubble.style.display = "flex";
      }
  
      //Enviar mensaje a watson e imprimir mensaje de usuario
    function sendMessage(e) {
        e.preventDefault()
        var input_text = document.getElementById("input-text");
        var message_sent = document.createElement("div");
        bubble.setAttribute("id", "mes_sent");
        message_sent.className = "chatwidget-message chatwidget-message-sent";
            
          var time = document.createElement("div")
          time.className = "chatwidget-message chatwidget-time"
          message_sent.appendChild(time)
          var hour = getTime()
          time.innerHTML = hour;
          
          var sent_content = document.createElement("div");
          sent_content.className = "chatwidget-message-content";
          message_sent.appendChild(sent_content);
  
            var parr_sent = document.createElement("p");
            parr_sent.innerHTML = input_text.value;
            sent_content.appendChild(parr_sent);
            
            
                 
          content.appendChild(message_sent);
          
          printConversation({message:input_text.value})
          
    }
      //Buscar el tiempo del mensaje
      function getTime(){
              var today = new Date();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              return time;
      }
      //Imprime mensaje del usuario, texto simple
      function receivedMessage(element){
          var message_received = document.createElement("div");
          message_received.className = "chatwidget-message chatwidget-message-received";
          content.appendChild(message_received);
                  
                  var img_r = document.createElement("img");
                  img_r.className = "chatwidget-message-avatar";
                  img_r.setAttribute("alt","Avatar");
                  img_r.src ="images/avatar.svg";
                  message_received.appendChild(img_r);

                      var mes_content = document.createElement("div");
                      mes_content.className = "chatwidget-message-content";
                      message_received.appendChild(mes_content);
                      
                        var mes_parr = document.createElement("p");
                        mes_parr.innerHTML = element;
                        mes_content.appendChild(mes_parr);

                            var time = document.createElement("div")
                            time.className = "chatwidget-message chatwidget-time"
                            message_received.appendChild(time)
                            var hour = getTime()
                            time.innerHTML = hour;
}
  
      //Enviar mensaje a watson
      function sendMessageWatson(message = '',callback){
          var x = new XMLHttpRequest()
          var url = `${data.apiUrl}receive`
          //console.log(`url: ${url}`)
          x.open('POST',url,true)
          x.setRequestHeader('Content-type','application/json')
          x.setRequestHeader('Authorization',data.apiKey)
          x.send(JSON.stringify({input:{text:message},context:{}}))
          x.onreadystatechange = () => {
              if(x.readyState === 4 && x.status === 200 && x.responseText){
                      callback(JSON.parse(x.responseText))
              }
          }
      }
      //Iniciar aplicación
      function startApplication(data){
          flg_start = true;
          printConversation(data);
      }
  
      //Revisar lista de actions
      function printConversation(data){
          //loader
          sendMessageWatson(data.message,function(res){
              var a = res;
              var b = res.output;
              console.log(a)
              console.log(b.text[0])
              console.log(b)
              //Enviar mensajes de texto, options
              i = 0;
              len = b.text.length;
              while(i<len){
                      receivedMessage(b.text[i])
                      i++;
              }
              //Enviar de acuerdo a action
              switch(b.action){
                  case "ACTION_show_video":
											// output.video
											//receivedVideo(b.text[i])
                      break;
                  case "ACTION_show_image":
                      // output.image
											break;
									case "ACTION_show_audio":
										// output.image
										break;
                  case "ACTION_show_template_generic":
                      //tomar output.elements_facebook
                      break;
                  case "ACTION_show_quick_replies":
                      //evaluar
                      break;
                  case "ACTION_show_buttons":
                      // output.elements
                      break;
									case "ACTION_show_select":
									// output.elements
									break;
                  default:
                      break;
              }
              //lista de case de acuerdo al action, usar while dentro de cada case
              //carousel, imagen, video, texto(default?)
              //sentMessage(data.message);
              
          })
          content.scrollTop = content.scrollHeight
      }
  
  
    /*
    
  
    var div2 = document.createElement("div");
        div2.className = "chatwidget-toolbar";
        header1.appendChild(div2);
  
    var button_close = document.createElement("button");
    button_close.className = "chatwidget-toolbar-button chatwidget-toolbar-button-close";
    button_close.innerHTML = "x";
    button_close.onclick = close;
    div2.appendChild(button_close);
  
    
  
    
    var loader = document.getElementById("loader");
      loader.className = "chatwidget chatwidget-loader";
      var span1 = document.createElement("span");
      var span2 = document.createElement("span");
      var span3 = document.createElement("span");
  
          loader.appendChild(span1);
          loader.appendChild(span2);
          loader.appendChild(span3);
  
   
    container.addEventListener("click", startConversation("hola"))
  
    var apikey = "mRmw9Qwe^qC!Vbz2jzUm#fg4A4n5LKgFJCZgEXNU%+QRX^CQKd2vbfnHk^BJnhk8phyS=SkGaauJG@_#yqPTBEfdbrRv&bMj+#J2msAY_WCF!58BnTqcV?n2anM^QqSmCj%FZmuzKTXN_uh55_6u*#evk4Jx9AHT6NXbZDxRU=v8-B2TJ%e=Pn92gq2QfCKa2LDx7f*4qc8K6=6t@pKkdbZKCGKChu5d+_G5?9XcMzpxX7E!F9U2jfEQdJDNye$-";
  
  
    function startApplication(data){
      var container = document.getElementById("widget");
      var div = document.createElement("div");
      div.className = "ejemplo";
      div.innerHTML = data.ejemplo
      
      //document.write( '<div class=\"prueba\"><div>hola</div></div>' );
      container.innerHTML = drawBubble(data.ejemplo)
      container.append(div);
      container.addEventListener("click", startConversation("hola"))
    }
  
    function sendMessageWatson(message = '',callback){
      console.log("aqui")
        var x = new XMLHttpRequest()
        var url = 'https://apropo-assistant-backend-dev.mybluemix.net/web/receive'
        //console.log(`url: ${url}`)
        x.open('POST',url,true)
        x.setRequestHeader('Content-type','application/json')
        x.setRequestHeader('Authorization',"mRmw9Qwe^qC!Vbz2jzUm#fg4A4n5LKgFJCZgEXNU%+QRX^CQKd2vbfnHk^BJnhk8phyS=SkGaauJG@_#yqPTBEfdbrRv&bMj+#J2msAY_WCF!58BnTqcV?n2anM^QqSmCj%FZmuzKTXN_uh55_6u*#evk4Jx9AHT6NXbZDxRU=v8-B2TJ%e=Pn92gq2QfCKa2LDx7f*4qc8K6=6t@pKkdbZKCGKChu5d+_G5?9XcMzpxX7E!F9U2jfEQdJDNye$-")
  
        x.send(JSON.stringify({input:{text:message},context:{}}))
        x.onreadystatechange = () => {
            if(x.readyState === 4 && x.status === 200 && x.responseText){
                callback(JSON.parse(x.responseText))
            }
        }
    }
    */
  }