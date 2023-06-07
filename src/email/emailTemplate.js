function sendRegisterEmailTemplate(token) {
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

function sendSaleEmailTemplate(orderNumber, name, price) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificar token</title>
    </head>
    
    <body>
        <h3 style="color: purple;"><b>Pago aceptado</b></h3>
        <p>Revisa el historial de compras de tu perfil desde la aplicación. Allí encontrarás tu código de descarga.</p>
        <p><b>Resumen del pedido:</b></p>
        <div>
            <table style="border: 1px solid gray; border-radius: 10px; padding: 10px;">
                <tr>
                    <td style="padding-right: 30px;">Número de pedido:</td>
                    <td>${orderNumber}</td>
                </tr>
                <tr>
                    <td style="padding-right: 30px;">Producto:</td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td style="padding-right: 30px;">Importe:</td>
                    <td>${price}€</td>
                </tr>
            </table>
        </div>
        <p>¡Esperamos volver a verte pronto!</p>
    </body>
    
    </html>`
}

module.exports = { sendRegisterEmailTemplate, sendSaleEmailTemplate }