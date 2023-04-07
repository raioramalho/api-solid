# Backend com conceitos SOLID & DESING PATTERN.

GymPass Style app.

## RFs (Rquisistos funcionais)

--:[X] Deve ser possível se cadastrar;

--:[X] Deve ser possível se autenticar;

--:[X] Deve ser possível obter o perfil de um usuário logado;

--:[X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;

--:[ ] Deve ser possível o usuário obter o seu histórico de check-ins;

--:[ ] Deve ser possível o usuário buscar academias próximas;

--:[ ] Deve ser possível o usuário buscar academias pelo nome;

--:[ ] Deve ser possível o usuário realizar check-in em uma academia;

--:[ ] Deve ser possível validar o check-in de um usuário;

--:[ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

--:[X] O Usuário não pode se cadastrar com e-mail existente;

--:[ ] O Usuário não pode fazer 2 check-ins no mesmo dia;

--:[ ] O Usuário não pode fazer check-in se não estiver perto (100m) da academia;

--:[ ] O Check-in só pode ser validado até 20 minutos após criado;

--:[ ] O Check-in só pode ser validado por administradores;

--:[ ] A Academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

--:[X] A senha do usuário precisa estar criptografada;

--:[X] Os dados da aplicação precisam estar persistidos em um banco de dados;

--:[ ] Todas as litas de dados precisam estar paginadas com 20 itens por página;

--:[ ] O Usuário deve ser identificado por um JWT (JSON WEB TOKEN);
