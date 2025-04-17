type stateType = "success" | "error";

export class SendResponse<T> {
	public exito: stateType;
	public estado: number;
	public mensaje: string;
	public data: T;

	constructor(exito: stateType, estado: number, mensaje: string, data: T) {
		this.exito = exito;
		this.estado = estado;
		this.mensaje = mensaje;
		this.data = data;
	}
}
