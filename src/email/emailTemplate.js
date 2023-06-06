function sendEmailTemplate(token) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificar token</title>
    </head>
    
    <body>
        <h3>¡Bienvenidx a <span style="color: purple;">Valki-games!</span></h3>
        <p style="color: black;">Introduce el siguiente código en la aplicación para verificar tu cuenta.</p>
        <p><b>Código:</b> ${token}</p>
        <p>¡Una vez verificada la cuenta, tendrás un montón de juegos esperándote! Esperamos verte a menudo por aquí.</p>
    </body>
    
    </html>`
}

module.exports = { sendEmailTemplate }