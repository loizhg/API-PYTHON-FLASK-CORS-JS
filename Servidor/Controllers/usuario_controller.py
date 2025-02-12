from flask import request, jsonify
from Classes.usuario import Usuario
from Repositories.usuario_repository import UsuarioRepository
from flask import Blueprint
from decouple import config
import os

usuario_controller = Blueprint('usuario_controller', __name__)

# Obtenha os caminhos dos arquivos JSON da configuração
data_dir = config('DATA_DIR', default='C:\\api_py\\Servidor\\Dados')

usuarios_json_file = os.path.join(data_dir, 'usuarios.json')

# Crie uma instância do UsuarioRepository com os argumentos necessários
usuario_repository = UsuarioRepository(data_dir, usuarios_json_file)

@usuario_controller.route('/usuarios', methods=['POST'])
def criar_usuario():
    dados = request.get_json()
    if 'login' in dados and 'senha' in dados:
        novo_usuario = Usuario(login=dados['login'], senha=dados['senha'])
        usuario_criado = usuario_repository.criar(novo_usuario)
        return jsonify(usuario_criado.__dict__), 201
    return 'Campos inválidos', 400

@usuario_controller.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = usuario_repository.listar_todos()
    return jsonify([usuario.__dict__ for usuario in usuarios])

@usuario_controller.route('/usuarios/<int:id>', methods=['GET'])
def obter_usuario(id):
    usuario = usuario_repository.obter_por_id(id)
    if usuario:
        return jsonify(usuario.__dict__)
    return 'Usuário não encontrado', 404

@usuario_controller.route('/usuarios/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    dados = request.get_json()
    if 'login' in dados and 'senha' in dados:
        usuario_atualizado = usuario_repository.atualizar(id, dados['login'], dados['senha'])
        if usuario_atualizado:
            return jsonify(usuario_atualizado.__dict__)
    return 'Usuário não encontrado ou campos inválidos', 404

@usuario_controller.route('/usuarios/<int:id>', methods=['DELETE'])
def excluir_usuario(id):
    if usuario_repository.excluir(id):
        return 'Usuário excluído com sucesso'
    return 'Usuário não encontrado', 404
