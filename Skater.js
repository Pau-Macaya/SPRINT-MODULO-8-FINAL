import {pool} from './connection.js';

export class Skater {
    constructor() {
        this.id ;
        this.email ;
        this.nombre;
        this.password;
        this.yearsExperiencia;
        this.especialidad;
        this.foto;
        this.estado;
        this.rol;
    }


    async newSkater(email, nombre, password, yearsExperiencia, especialidad, foto) {
        // console.log(email, nombre, password, yearsExperiencia, especialidad, foto);
        // console.log(`INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6)`, [ email, nombre, password, yearsExperiencia, especialidad, foto]);
        try {
            await pool.query(`INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6)`, [ email, nombre, password, yearsExperiencia, especialidad, foto]);
            console.log("funciono");
        } catch (error) {
            console.log(error);
        }
        
        
    }

    async getSkater(email, password) {
        const skater = await pool.query(`SELECT email, nombre, anos_experiencia, especialidad, foto , rol, admin FROM skaters WHERE email = $1 AND password = $2`, [email, password]);
        
        return skater.rows;
    }

    async getskaters() {
        const result = await pool.query(`SELECT  nombre, anos_experiencia, especialidad, foto, estado FROM skaters WHERE id > 0`);
        return result.rows
    }
    async validuser(email,password){
        const uservalid = await pool.query(`
        SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS usuario_existe
        FROM skaters
        WHERE email = $1 AND password = $2`, [email, password]);
        //console.log(typeof(uservalid) );
        //console.log(uservalid);
        console.log(uservalid.rows[0].usuario_existe);

        if (uservalid.rows[0].usuario_existe == 1) {
            return true;
        } else {
            return false;
        };
    }
    
    async updateSkater(email, nombre, password, yearsExperiencia, especialidad, foto) {
        await pool.query(`UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4, foto = $5 WHERE email = $6`, [nombre, password, yearsExperiencia, especialidad, foto, email]);
    }

    async updateEstado(email, estado) {
        await pool.query(`UPDATE skaters SET estado = $2 WHERE email = $1`, [email, estado]);
    }
   
}   
