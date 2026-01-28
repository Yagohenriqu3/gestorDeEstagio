import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '05112017',
  database: 'mysql'
})

try {
  // Alterar o usuário root para usar mysql_native_password
  await connection.execute(
    "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '05112017'"
  )
  console.log('✅ Usuário root alterado para mysql_native_password')

  // Flush privileges
  await connection.execute('FLUSH PRIVILEGES')
  console.log('✅ Privilégios recarregados')
} catch (error) {
  console.error('❌ Erro:', error.message)
} finally {
  await connection.end()
}
