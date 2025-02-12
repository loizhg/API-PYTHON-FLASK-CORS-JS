import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from decouple import config
from Controllers.usuario_controller import usuario_controller  # Importe a blueprint

app = Flask(__name__)
CORS(app)

# Configure os caminhos dos arquivos JSON usando variáveis de ambiente
data_dir = config('DATA_DIR', default='C:\\api_py\\Servidor\\Dados')
usuarios_json_file = os.path.join(data_dir, 'usuarios.json')


# Função para criar ou carregar os dados de um arquivo JSON
def carregar_dados(json_file):
    if not os.path.exists(json_file):
        with open(json_file, 'w', encoding='utf-8') as file:
            json.dump([], file)

    with open(json_file, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError:
            data = []

    return data

# Registre a blueprint na aplicação
app.register_blueprint(usuario_controller)

if __name__ == '__main__':
    # Certificar-se de que os arquivos existem ou são criados na primeira execução
    carregar_dados(usuarios_json_file)
    
    app.run(debug=True)
