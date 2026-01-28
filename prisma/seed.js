import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const SALT_ROUNDS = 10

async function main() {
  console.log('🔐 Iniciando criação de usuários de teste...\n')

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '05112017',
    database: 'gestao_estagio',
  })

  try {
    const usuarios = [
      {
        nomeCompleto: 'Administrador Sistema',
        email: 'admin@conexta.com.br',
        senha: 'Admin@123',
        tipoUsuario: 'Administrador',
      },
      {
        nomeCompleto: 'João Silva',
        email: 'joao.silva@conexta.com.br',
        senha: 'Aluno@123',
        tipoUsuario: 'Aluno',
      },
      {
        nomeCompleto: 'Maria Santos',
        email: 'maria.santos@conexta.com.br',
        senha: 'Coord@123',
        tipoUsuario: 'Coordenador',
      },
      {
        nomeCompleto: 'Carlos Costa',
        email: 'carlos.costa@conexta.com.br',
        senha: 'Gestor@123',
        tipoUsuario: 'Docente', // Usando Docente como substituto para Gestor por enquanto
      },
      {
        nomeCompleto: 'Ana Oliveira',
        email: 'ana.oliveira@conexta.com.br',
        senha: 'Precep@123',
        tipoUsuario: 'Preceptor',
      },
    ]

    for (const user of usuarios) {
      // Verificar se usuário já existe
      const [usuarioExistente] = await connection.execute(
        'SELECT id_usuario FROM usuario WHERE email = ?',
        [user.email]
      )

      if (usuarioExistente.length > 0) {
        console.log(`⚠️  Usuário ${user.email} já existe. Pulando...`)
        continue
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(user.senha, SALT_ROUNDS)

      // Inserir usuário
      await connection.execute(
        `INSERT INTO usuario 
         (nome_completo, email, senha_hash, tipo_usuario, status, primeiro_acesso, data_cadastro) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [user.nomeCompleto, user.email, senhaHash, user.tipoUsuario, 'Ativo', true]
      )

      console.log(`✅ Usuário criado: ${user.email}`)
      console.log(`   📍 Perfil: ${user.tipoUsuario}`)
      console.log(`   🔑 Senha temporária: ${user.senha}`)
      console.log(`   ⚠️  Altere a senha no primeiro acesso!\n`)
    }

    console.log('✨ Todos os usuários de teste foram criados com sucesso!')
    console.log('\n📋 Resumo de Credenciais:\n')
    console.log('┌─────────────────────────────────────────────────────────┐')
    console.log('│ ADMINISTRADOR                                           │')
    console.log('├─────────────────────────────────────────────────────────┤')
    console.log('│ Email: admin@conexta.com.br                             │')
    console.log('│ Senha: Admin@123                                        │')
    console.log('│ Rota: /adm                                              │')
    console.log('└─────────────────────────────────────────────────────────┘')
    console.log()
    console.log('┌─────────────────────────────────────────────────────────┐')
    console.log('│ ALUNO                                                   │')
    console.log('├─────────────────────────────────────────────────────────┤')
    console.log('│ Email: joao.silva@conexta.com.br                        │')
    console.log('│ Senha: Aluno@123                                        │')
    console.log('│ Rota: /aluno                                            │')
    console.log('└─────────────────────────────────────────────────────────┘')
    console.log()
    console.log('┌─────────────────────────────────────────────────────────┐')
    console.log('│ COORDENADOR                                             │')
    console.log('├─────────────────────────────────────────────────────────┤')
    console.log('│ Email: maria.santos@conexta.com.br                      │')
    console.log('│ Senha: Coord@123                                        │')
    console.log('│ Rota: /coordenador                                      │')
    console.log('└─────────────────────────────────────────────────────────┘')
    console.log()
    console.log('┌─────────────────────────────────────────────────────────┐')
    console.log('│ GESTOR LOCAL                                            │')
    console.log('├─────────────────────────────────────────────────────────┤')
    console.log('│ Email: carlos.costa@conexta.com.br                      │')
    console.log('│ Senha: Gestor@123                                       │')
    console.log('│ Rota: /gestor-local                                     │')
    console.log('└─────────────────────────────────────────────────────────┘')
    console.log()
    console.log('┌─────────────────────────────────────────────────────────┐')
    console.log('│ PRECEPTOR                                               │')
    console.log('├─────────────────────────────────────────────────────────┤')
    console.log('│ Email: ana.oliveira@conexta.com.br                      │')
    console.log('│ Senha: Precep@123                                       │')
    console.log('│ Rota: /preceptor                                        │')
    console.log('└─────────────────────────────────────────────────────────┘')
  } catch (erro) {
    console.error('❌ Erro ao criar usuários:', erro)
    process.exit(1)
  } finally {
    await connection.end()
  }
}

main()
