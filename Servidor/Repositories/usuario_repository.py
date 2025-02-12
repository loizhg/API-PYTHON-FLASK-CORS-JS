import json
from Classes.usuario import Usuario

class UsuarioRepository:
    def __init__(self, data_dir, usuarios_json_file):
        self.data_dir = data_dir
        self.usuarios_json_file = usuarios_json_file

    def carregar_usuarios(self):
        with open(self.usuarios_json_file, 'r', encoding='utf-8') as file:
            try:
                data = json.load(file)
                usuarios = [Usuario(**usuario) for usuario in data]
                return usuarios
            except json.JSONDecodeError:
                return []

    def salvar_usuarios(self, usuarios):
        with open(self.usuarios_json_file, 'w', encoding='utf-8') as file:
            data = [usuario.__dict__ for usuario in usuarios]
            json.dump(data, file, ensure_ascii=False, indent=4)

    def criar(self, usuario):
        usuarios = self.carregar_usuarios()
        usuario.id = len(usuarios) + 1
        usuarios.append(usuario)
        self.salvar_usuarios(usuarios)
        return usuario

    def listar_todos(self):
        return self.carregar_usuarios()

    def obter_por_id(self, id):
        usuarios = self.carregar_usuarios()
        for usuario in usuarios:
            if usuario.id == id:
                return usuario
        return None

    def atualizar(self, id, login, senha):
        usuarios = self.carregar_usuarios()
        for usuario in usuarios:
            if usuario.id == id:
                usuario.login = login
                usuario.senha = senha
                self.salvar_usuarios(usuarios)
                return usuario
        return None

    def excluir(self, id):
        usuarios = self.carregar_usuarios()
        for usuario in usuarios:
            if usuario.id == id:
                usuarios.remove(usuario)
                self.salvar_usuarios(usuarios)
                return True
        return False
