![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-⚡-646CFF?logo=vite&logoColor=white)

# RecycleMetrics Frontend

RecycleMetrics Frontend é a interface web do projeto RecycleMetrics, uma aplicação voltada para o acompanhamento de compras, descartes de resíduos e apoio à mudança de hábitos sustentáveis.

Este repositório contém apenas o frontend desenvolvido em React + TypeScript.
A API REST (backend em Java com Spring Boot) é mantido em um [repositório separado](https://github.com/MiguellAlvess/ecotrack-api).

## Principais tecnologias

- **React + TypeScript**

- **React Query**

- **React Hook Form + Zod**

- **TailwindCSS**

- **shadcn/ui**

## Como executar localmente

#### Pré-requisitos

- Node.js 20 ou superior

- npm

- Git

- Backend RecycleMetrics API em execução (porta 8080 por padrão)

#### Clonar o repositório

No terminal:

```bash
git clone https://github.com/seu-usuario/recyclemetrics-frontend.git
```

Entre no diretório

```bash
cd recyclemetrics-frontend
```

Instalar dependências

```bash
npm install
```

Executar a aplicação

```bash
npm run dev
```

Por padrão, o frontend ficará disponível em:

`http://localhost:5173`

Certifique-se de que a API esteja rodando (por padrão em `http://localhost:8080`
).

Se a API estiver em outro endereço, a URL base pode ser ajustada na camada de serviços HTTP do frontend.

## Documentação

A documentação completa do sistema está disponível na [Wiki do projeto](https://github.com/MiguellAlvess/ecotrack-api/wiki)

## Equipe

<table> <tr> <th>Miguel Alves</th> <th>João Vitor</th> <th>Daniela Vescia</th> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/d563577d-c61c-4192-b3bb-4416843fa85c" width="180" height="180" style="object-fit: cover;"><br> <a href="https://www.linkedin.com/in/miguel-alvess/">LinkedIn ➜</a> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/c860a46e-3cf0-4ec4-bf08-0da7c8c125db" width="180" height="180" style="object-fit: cover;"><br> <a href="https://www.linkedin.com/in/jo%C3%A3o-monteiro-8411aa309/">LinkedIn ➜</a> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/9240cb75-ed6e-4d6d-883a-d261ffac69fb" width="180" height="180" style="object-fit: cover;"><br> <a href="https://www.linkedin.com/in/daniela-vescia-732144102/">LinkedIn ➜</a> </td> </tr> </table>
