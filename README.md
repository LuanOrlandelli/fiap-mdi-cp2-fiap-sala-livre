# FIAP Sala Livre — CP2

Aplicativo desenvolvido em React Native com Expo para gerenciamento e reserva de salas de estudo da FIAP.

---

# 📚 Sobre o Projeto

## 📌 Descrição

O **FIAP Sala Livre** foi desenvolvido para resolver um problema comum enfrentado pelos alunos da FIAP: a dificuldade em localizar e reservar salas disponíveis para estudos, reuniões acadêmicas e desenvolvimento de projetos.

O aplicativo permite:

- visualizar salas disponíveis;
- pesquisar salas;
- reservar ambientes;
- bloquear salas já ocupadas;
- cancelar reservas;
- manter login persistido;
- salvar informações localmente mesmo após fechar o aplicativo.

---

## 🎯 Operação da FIAP Escolhida

O projeto foi baseado na operação de:

### Gestão de Espaços Acadêmicos

Escolhemos essa operação porque a utilização de salas de estudo é uma necessidade frequente dentro da rotina universitária. O aplicativo melhora a organização dos espaços, evita conflitos de uso e oferece uma experiência prática para os alunos.

---

# 🚀 Evolução do CP1 para o CP2

No CP1 o projeto possuía:

- navegação entre telas;
- listagem de salas;
- tela de detalhes;
- interface inicial.

No CP2 foram adicionados:

✅ autenticação real com login e cadastro  
✅ persistência de dados com AsyncStorage  
✅ Context API para gerenciamento global  
✅ proteção de rotas autenticadas  
✅ reservas persistidas  
✅ bloqueio de salas ocupadas  
✅ validação completa de formulários  
✅ melhorias visuais e de UX/UI  
✅ busca e filtragem em tempo real  
✅ feedback visual de sucesso e erro  
✅ sessão persistida após fechar o app  

---

# ✅ Funcionalidades Implementadas

## 🔐 Autenticação

- Cadastro de usuários
- Login validado
- Logout
- Sessão persistida
- Navegação protegida

---

## 🏢 Gerenciamento de Salas

- Listagem de salas
- Tela de detalhes
- Reserva de salas
- Cancelamento de reservas
- Bloqueio automático de salas ocupadas

---

## 💾 Persistência Local

- Usuários salvos no AsyncStorage
- Sessão salva no AsyncStorage
- Reservas persistidas localmente

---

## 🎨 UX/UI

- Interface moderna
- Feedback visual
- Loading
- Lista vazia
- Busca em tempo real
- Filtros
- Layout responsivo

---

# 👨‍💻 Integrantes do Grupo

| Nome | RM |
|---|---|
| Luan Orlandelli Ramos | RM554747 |
| Jorge Luiz Silva Santos | RM554418 |
| Arthur Bobadilla Franchi | RM555056 |

---

# ⚙️ Como Rodar o Projeto

## 📋 Pré-requisitos

- Node.js instalado
- Expo Go instalado no celular
- Expo SDK 53
- Git instalado

---

## ▶️ Executando o Projeto

```bash
git clone https://github.com/LuanOrlandelli/fiap-mdi-cp2-fiap-sala-livre

cd fiap-mdi-cp2-fiap-sala-livre

npm install

npx expo start
```

---

# 📱 Demonstração Visual

# 🖼️ Prints das Telas

## Tela de Login

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 19" src="https://github.com/user-attachments/assets/70d87f41-79d6-4d31-9020-02ee33ab8531" />

---

## Tela de Cadastro

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 19 (1)" src="https://github.com/user-attachments/assets/fa7a256b-23c1-443a-8af2-2fd9fd625d08" />

---

## Tela Inicial

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 19 (2)" src="https://github.com/user-attachments/assets/81fc7e97-ef2e-405b-b158-5501c26210a5" />

---

## Tela de Salas

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 20" src="https://github.com/user-attachments/assets/04c82e7e-5a33-417e-ae7c-73f17aef6e5c" />

---

## Tela de Detalhes

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 20 (1)" src="https://github.com/user-attachments/assets/18e12e2c-c477-405a-837d-ed4057b89954" />


---

## Tela de Reserva Ocupada

<img width="250" alt="WhatsApp Image 2026-05-03 at 22 47 20 (2)" src="https://github.com/user-attachments/assets/20145721-b6ca-46aa-918d-0e17ad07031a" />


---

# 🎥 Demonstração em Vídeo

## Fluxo completo do aplicativo

Link para acesso: 
[Clique aqui](https://drive.google.com/file/d/1IU7qc944hueOQMEkuJ5LAG2gDYZGf5i6/view?usp=sharing)

---

# 🧠 Decisões Técnicas

# 📁 Estrutura do Projeto

```txt
app/
 ├── index.tsx
 ├── login.tsx
 ├── cadastro.tsx
 ├── salas.tsx
 ├── detalhe.tsx

components/
 ├── AppButton.tsx
 ├── AppInput.tsx
 ├── EmptyState.tsx
 ├── RoomCard.tsx

context/
 ├── AuthContext.tsx
 ├── AppDataContext.tsx

constants/
 ├── colors.ts

data/
 ├── rooms.ts
```

---

# 🌎 Context API

## AuthContext

Responsável por:

- login
- logout
- sessão persistida
- usuário autenticado
- proteção de rotas

---

## AppDataContext

Responsável por:

- reservas
- persistência das reservas
- criação de reserva
- cancelamento de reserva
- atualização global das salas

---

# 🔐 Como a autenticação foi implementada

A autenticação foi construída utilizando:

- Context API
- AsyncStorage

O usuário realiza cadastro e os dados são salvos localmente. O login valida as credenciais persistidas.

Quando autenticado, o usuário é salvo na sessão:

```ts
@session
```

Ao abrir o aplicativo novamente, a sessão é restaurada automaticamente.

---

# 💾 Utilização do AsyncStorage

## Dados Persistidos

| Chave | Função |
|---|---|
| @users | Armazena usuários cadastrados |
| @session | Mantém usuário logado |
| @reservations | Armazena reservas realizadas |

---

# 🔒 Navegação Protegida

As telas internas verificam se existe um usuário autenticado através do AuthContext.

Caso não exista sessão ativa:

```tsx
router.replace('/login');
```

O usuário é redirecionado automaticamente para a tela de login.

---

# ⭐ Diferencial Implementado

# 🔍 Busca e Filtragem em Tempo Real

## Justificativa

Escolhemos esse diferencial porque ele melhora significativamente a experiência do usuário, permitindo localizar salas rapidamente por:

- nome;
- bloco;
- período;
- disponibilidade.

Isso torna a navegação mais rápida e intuitiva.

---

## Implementação Técnica

A busca foi implementada utilizando:

- `useState`
- `useMemo`
- `filter()`

Exemplo:

```tsx
const filteredRooms = rooms.filter((room) =>
  room.nome.toLowerCase().includes(busca.toLowerCase())
);
```

---

# 🔮 Próximos Passos

Com mais tempo, gostaríamos de implementar:

- Dark Mode
- Notificações de lembrete
- Upload de foto de perfil
- Integração com API real
- Banco de dados online
- Reserva por horário
- Histórico de reservas
- Dashboard administrativo

---

# 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Context API

---

# ✅ Status do Projeto

✔️ Projeto funcional  
✔️ Compatível com Expo Go  
✔️ Persistência local implementada  
✔️ Navegação protegida  
✔️ Fluxo completo funcionando

---

# 📌 Observação

Projeto acadêmico desenvolvido para o Checkpoint 2 da disciplina de Mobile Development da FIAP.
