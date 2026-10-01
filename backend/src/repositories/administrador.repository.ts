import { getPostgresPool } from '../database/postgres.js'

export type AdministratorRecord = {
  identificador: number
  usuario: string
  contrasena: string
}

export async function findAdministratorByUsername(usuario: string): Promise<AdministratorRecord | undefined> {
  const result = await getPostgresPool().query<AdministratorRecord>(`
    SELECT identificador, usuario, contrasena
    FROM administrador
    WHERE usuario = $1
  `, [usuario])

  return result.rows[0]
}
