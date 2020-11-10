create table usuarios(
    id_usuario int primary key,
    nombre varchar(220),
    apellido varchar(220),
    correo varchar(220),
    nacimiento varchar(220),
    ruta_foto varchar(220),
    contrasenia varchar(220),
    creditos int,
    tipo varchar(2)

);



insert into usuarios
    (id_usuario, nombre, apellido, correo, nacimiento, ruta_foto, contrasenia, creditos, tipo)
    values
    (1,'Carlos', 'tenes', 'cctenes@gmail.com', '04-06-1998', 'nope', '81dc9bdb52d04dc20036dbd8313ed055',1,'A');






create table paises(
    id_pais int primary key,
    nombre_pais varchar(220)
);





create table pais_usuario(
    id_usuario_fk int,
    id_pais_fk int,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade ,
    foreign key (id_pais_fk) references paises(id_pais) on delete cascade
);




create table bitacora(
    id_bitacora int primary key,
    id_usuario_fk int,
    asunto clob,
    fecha varchar(220),
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);




create table productos(
    id_producto int primary key,
    nombre varchar(220),
    detalle clob,
    precio decimal(15,8),
    imagen varchar(220),
    p_clave varchar(220),
    estado int,
    ventas int
);

create table categorias(
    id_categoria int primary key,
    nombre varchar(220)
);



create table catogoria_producto(
    id_categoria_fk int,
    id_producto_fk int,
    foreign key (id_categoria_fk) references categorias(id_categoria)on delete cascade ,
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade
);



create table comentario_producto(
    id_comentario int,
    id_producto_fk int,
    id_usuario_fk,
    comentario clob,
    fecha varchar(200),
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);



create table denuncia_producto(
    id_denuncia_fk int,
    id_producto_fk int,
    id_usuario_fk,
    comentario clob,
    fecha varchar(200),
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);

create table carritos(
    id_carrito int primary key,
    smt varchar(220)
);

create table carrito_usuario(
    id_carrito_fk int,
    id_usuario_fk int,
    foreign key (id_carrito_fk) references carritos(id_carrito)on delete cascade ,
    foreign key (id_usuario_fk) references usuarios(id_usuario)on delete cascade
);

create table producto_carrito(
    id_carrito_fk int,
    id_producto_fk int,
    cantidad int,
    foreign key (id_carrito_fk) references carritos(id_carrito)on delete cascade ,
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade
);




create table conversacion(
    id_cons int primary key,
    id_emisor_fk int,
    id_receptor_fk int,
    foreign key (id_emisor_fk) references usuarios(id_usuario) on delete cascade ,
    foreign key (id_receptor_fk) references usuarios(id_usuario) on delete cascade
);



create table chat(
    id_msj int,
    id_cons_fk int,
    id_usuario_fk int,
    texto clob,
    fecha varchar(200),
    foreign key (id_cons_fk) references conversacion(id_cons) on delete cascade,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);



create table like_producto(
    id_like int,
    id_producto_fk int,
    id_usuario_fk int,
    tipo varchar(15),
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);

create table cliente_producto(
    id_producto_fk int,
    id_usuario_fk int,
    foreign key (id_producto_fk) references productos(id_producto) on delete cascade,
    foreign key (id_usuario_fk) references usuarios(id_usuario) on delete cascade
);



drop table cliente_producto;
drop table like_producto;
drop table chat;
drop table producto_carrito;
drop table carrito_usuario;
drop table carritos;
drop table denuncia_producto;
drop table comentario_producto;
drop table categorias;
drop table catogoria_producto;
drop table productos;
drop table bitacora;
drop table pais_usuario;
drop table cliente_producto;
drop table usuarios;
drop table paises;
drop table usuarios;
drop table conversacion;
