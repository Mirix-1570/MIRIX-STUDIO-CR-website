/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LegalProps {
  kind: 'privacy' | 'terms';
  email: string;
  location: string;
}

export default function Legal({ kind, email, location }: LegalProps) {
  const privacy = kind === 'privacy';

  return (
    <section className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil">
      <div className="max-w-3xl">
        <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold">
          {privacy ? 'Datos personales' : 'Condiciones de uso'}
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl text-ciruela mt-3 mb-8">
          {privacy ? 'Política de privacidad' : 'Términos y condiciones'}
        </h1>

        {privacy ? (
          <div className="space-y-6 text-[15px] leading-7 text-malva">
            <p>
              Mirix Studio CR, con sede en {location}, es responsable de los datos que compartís a través de este sitio.
            </p>
            <p>
              El formulario de contacto recoge nombre, correo, teléfono, el servicio de interés y el mensaje. Esos datos se usan solo para responder la consulta y coordinar el proyecto. El mismo aviso puede enviarse por WhatsApp si lo pedís desde la confirmación.
            </p>
            <p>
              El carrito de la tienda se guarda en este navegador. No crea una cuenta ni se envía a un servidor hasta que encargás el pedido por WhatsApp.
            </p>
            <p>
              No vendemos ni cedemos datos personales. Podés pedir la corrección o la eliminación de tu mensaje escribiendo a {email}.
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-[15px] leading-7 text-malva">
            <p>
              El sitio presenta los servicios de producción audiovisual, fotografía, diseño y tienda de Mirix Studio CR. Los precios publicados son una referencia para Esparza y Puntarenas centro. Otras zonas del país se cotizan con viático.
            </p>
            <p>
              Una consulta o un plan elegido no reservan fecha hasta que Miranda lo confirme. Los encargos de la tienda se coordinan por WhatsApp: el pago y el envío se acuerdan en esa conversación.
            </p>
            <p>
              Las fotografías, videos y piezas del portafolio pertenecen al estudio o a sus clientes, y no pueden reutilizarse sin permiso. El trabajo entregado a un cliente se rige por lo acordado en la cotización.
            </p>
            <p>
              El uso de este sitio se entiende conforme a la legislación de Costa Rica. Para cualquier aclaración: {email}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
