# API de Natal
---

## Entidades

### 1. **User**
Representa um usuário cadastrado.

- **id** (number): Identificador único do usuário.
- **name** (string): Nome do usuário.
- **email** (string): Endereço de e-mail do usuário.
- **password** (string): Senha do usuário.

### 2. **Group**
Define os grupos nos quais os sorteios de amigo oculto são realizados.

- **id** (number): Identificador único do grupo.
- **name** (string): Nome do grupo.
- **description** (string): Descrição do grupo.
- **status** (enum): Status do grupo, podendo ser `PENDING` (pendente) ou `COMPLETED` (finalizado).
- **hostId** (number): Identificador do organizador do grupo.
- **participants** (User[]): Lista de usuários participantes do grupo.

### 3. **Draw**
Representa os sorteios de amigo oculto realizados dentro de um grupo.

- **id** (number): Identificador único do sorteio.
- **group** (Group): Referência ao grupo ao qual o sorteio pertence.
- **user** (User): O participante que tirou um amigo oculto.
- **friend** (User): O amigo oculto sorteado para o participante.

---

## Rotas Disponíveis (por enquanto)

### Rotas de Grupo
- **`POST /grupos/criar`** - Criar um novo grupo.
- **`POST /grupos/adicionar`** - Adicionar participantes a um grupo existente.
- **`GET /grupos`** - Listar grupos disponíveis e suas informações.

### Rotas de Usuário
- **`POST /auth/signup`** - Registrar um novo usuário.
- **`POST /auth/signin`** - Login de usuário.
- **`GET /users`** - Listar usuários cadastrados.

### Rotas de Sorteio
- **`POST /sorteio/criar/:id_grupo`** - Realizar o sorteio para um grupo existente, gerando os pares de amigo oculto.
- **`GET /sorteio/meuamigo/:id_grupo/:id_usuario`** - Obter o seu amigo secreto de determinado grupo onde o usuário foi participante.


---

## Fluxo da API

1. **Criação de Grupo**:
   - O organizador cria um grupo fornecendo nome, descrição e identificador do host.

2. **Adição de Participantes**:
   - Os usuários são adicionados ao grupo por meio de uma rota, fornecendo o ID do grupo e o ID do usuário.

3. **Realização do Sorteio**:
   - O sorteio é iniciado fornecendo o ID do grupo. Os participantes são aleatoriamente emparelhados, e os resultados são armazenados na entidade `Draw`.

4. **Obtenção do Amigo Secreto**:
   - A obtenção é feita fornecendo o ID do grupo e o ID do usuário.

---

**OBS:** O último commit foi feito no computador do `labi***`. Esqueci de trocar o nome do autor.

