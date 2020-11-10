select * from usuarios;

select * from usuarios
inner join pais_usuario pu on usuarios.id_usuario = pu.id_usuario_fk
inner join paises p on p.id_pais = pu.id_pais_fk
;

select * from usuarios order by id_usuario;
select sum(cantidad * precio) as x from producto_carrito
inner join productos p on p.id_producto = producto_carrito.id_producto_fk
;

select nombre_pais from paises
inner join pais_usuario pu on paises.id_pais = pu.id_pais_fk
inner join usuarios u on u.id_usuario = pu.id_usuario_fk
where id_usuario = 2
;

select * from denuncia_producto;


select sum(cantidad * precio) as x from producto_carrito
inner join productos p on p.id_producto = producto_carrito.id_producto_fk
inner join carrito_usuario cu on producto_carrito.id_carrito_fk = cu.id_carrito_fk
where id_usuario_fk = 4
;


select p.nombre, p.precio, cantidad, id_producto from carritos
inner join carrito_usuario cu on carritos.id_carrito = cu.id_carrito_fk
inner join producto_carrito pc on carritos.id_carrito = pc.id_carrito_fk
inner join productos p on p.id_producto = pc.id_producto_fk

;


select  nombre, apellido, correo, nacimiento, ruta_foto, nombre_pais from usuarios
inner join pais_usuario pu on usuarios.id_usuario = pu.id_usuario_fk
inner join paises p on p.id_pais = pu.id_pais_fk

where id_usuario = 2
;


select  id_producto,usuarios.nombre as usuario,usuarios.apellido as apellido ,p.nombre as producto, c2.nombre as categoria, p.precio, p.detalle, id_usuario from usuarios
inner join cliente_producto cp on usuarios.id_usuario = cp.id_usuario_fk
inner join productos p on p.id_producto = cp.id_producto_fk
inner join catogoria_producto cp2 on p.id_producto = cp2.id_producto_fk
inner join categorias c2 on c2.id_categoria = cp2.id_categoria_fk

where id_producto = 1
;


select nombre, apellido, id_comentario, comentario, fecha from usuarios
inner join comentario_producto cp on usuarios.id_usuario = cp.id_usuario_fk
order by id_comentario
;


select nombre, apellido, id_denuncia_fk, comentario, fecha from usuarios
inner join denuncia_producto cp on usuarios.id_usuario = cp.id_usuario_fk
order by id_denuncia_fk
;


select count(*) as likes from productos
inner join like_producto lp on productos.id_producto = lp.id_producto_fk
where tipo = 'L' and id_producto = 1
;


select count(*) as dislikes from productos
inner join like_producto lp on productos.id_producto = lp.id_producto_fk
where tipo = 'D' and id_producto = 1
;

select id_producto_fk, id_usuario_fk, comentario, fecha, u.nombre, apellido, p.nombre as producto, estado from denuncia_producto
inner join usuarios u on u.id_usuario = denuncia_producto.id_usuario_fk
inner join productos p on p.id_producto = denuncia_producto.id_producto_fk
;

select nombre, apellido, correo, fecha, asunto from bitacora
inner join usuarios u on u.id_usuario = bitacora.id_usuario_fk
order by  id_bitacora
;

select nombre, apellido, texto, fecha from chat
inner join usuarios u on u.id_usuario = chat.id_usuario_fk
where id_cons_fk = 1
;


select creditos, id_usuario from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
where id_producto = 1
;

select id_carrito from carritos
inner join carrito_usuario cu on carritos.id_carrito = cu.id_carrito_fk
inner join usuarios u on u.id_usuario = cu.id_usuario_fk
where id_usuario = 4
;

-- chat con  vendedor cliente--
select id_cons, u.nombre, u.apellido from conversacion
inner join usuarios u on u.id_usuario = conversacion.id_emisor_fk
inner join usuarios u2 on u2.id_usuario = conversacion.id_receptor_fk
where u2.id_usuario = 1
;



-- chat cliente vendedor --
select id_cons, u.nombre, u.apellido from conversacion

inner join usuarios u on u.id_usuario = conversacion.id_receptor_fk
inner join usuarios u2 on u2.id_usuario = conversacion.id_emisor_fk
where u2.id_usuario = 1
;

select productos.nombre as producto, productos.ventas,u.nombre as nombre, u.apellido as apellido from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
where ROWNUM <= 10
order by productos.ventas desc
;

select count(*) as likes, u.nombre as nombre, u.apellido as apellido, productos.nombre as producto from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
inner join like_producto lp on productos.id_producto = lp.id_producto_fk
where lp.tipo = 'L' and ROWNUM <= 10
group by u.nombre, u.apellido, productos.nombre
order by likes desc
;

select count(*) as dislikes, u.nombre as nombre, u.apellido as apellido, productos.nombre as producto from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
inner join like_producto lp on productos.id_producto = lp.id_producto_fk
where lp.tipo = 'D' and ROWNUM <= 10
group by u.nombre, u.apellido, productos.nombre
order by dislikes asc
;


select nombre, apellido, correo, creditos from usuarios
where ROWNUM <= 10
order by creditos asc
;

select nombre, apellido, correo, creditos from usuarios
where ROWNUM <= 10
order by creditos desc
;

select count(*) as cant, u.nombre as nombre, u.apellido as apellido, u.correo as correo, u.nacimiento as fecha_nac from denuncia_producto
inner join productos p on p.id_producto = denuncia_producto.id_producto_fk
inner join usuarios u on u.id_usuario = denuncia_producto.id_usuario_fk
where ROWNUM <= 1
group by u.nombre, u.apellido, u.correo, u.nacimiento
order by cant desc
;

select count(id_producto) as cant, u.nombre as nombre, u.apellido as apellido, u.correo as correo, u.creditos as creditos from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
where ROWNUM <= 10
group by u.nombre, u.apellido, u.correo, u.creditos
;

select sum(usuarios.creditos) as creditos, count(p.id_producto)as productos, count(usuarios.id_usuario) as usuarios from usuarios
inner join cliente_producto cp on usuarios.id_usuario = cp.id_usuario_fk
inner join productos p on p.id_producto = cp.id_producto_fk
inner join pais_usuario pu on usuarios.id_usuario = pu.id_usuario_fk
inner join paises p2 on p2.id_pais = pu.id_pais_fk
where ROWNUM <= 10
;

select sum(creditos) as creditos, nombre_pais, count(u.id_usuario) as usuarios,(
    select count(id_producto) as productos from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    inner join pais_usuario pu on u.id_usuario = pu.id_usuario_fk
    inner join paises p on p.id_pais = pu.id_pais_fk
    where p.nombre_pais = paises.nombre_pais
    )as productos from paises
inner join pais_usuario pu on paises.id_pais = pu.id_pais_fk
inner join usuarios u on u.id_usuario = pu.id_usuario_fk
where ROWNUM <= 10
group by nombre_pais
;


select count(id_producto) as productos from productos
inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
inner join usuarios u on u.id_usuario = cp.id_usuario_fk
inner join pais_usuario pu on u.id_usuario = pu.id_usuario_fk
inner join paises p on p.id_pais = pu.id_pais_fk
where nombre_pais = 'GUATEMALA'
;
