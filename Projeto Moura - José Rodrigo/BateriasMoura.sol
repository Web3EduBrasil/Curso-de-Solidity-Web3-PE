// Especifica a versão do compilador Solidity
pragma solidity ^0.8;

contract RegistroBateriasMoura {

    // 1. Enum para o campo 'uso' para garantir que os valores sejam restritos
    enum UsoBateria { AUTOMOTIVO, NAUTICO, INDUSTRIAL }

    // 2. Definição da Struct para Estruturar os Dados da Bateria
    struct BateriaDefeituosa {
        string tipo;
        UsoBateria uso;          // Usando o Enum definido
        string numeroDeSerie;
        uint256 dataProd;        // Timestamp UNIX
        string lote;
    }

    // 3. Array Dinâmico para Armazenar as Baterias
    BateriaDefeituosa[] public baterias;

    // Mapeamentos para busca rápida e verificação de unicidade (Número de Série)
    mapping(string => uint256) private serieParaIndice;
    mapping(string => bool) private serieExiste;

    // Eventos para notificar o mundo exterior sobre o registro
    event BateriaRegistrada(
        string indexed numeroDeSerie,
        string tipo,
        UsoBateria indexed uso
    );

    // 4. Método Setter (Para Postar/Registrar um Dado de Struct)
    function registrarBateria(
        string memory _tipo,
        UsoBateria _uso,             // Recebe o enum diretamente
        string memory _numeroDeSerie,
        uint256 _dataProd,
        string memory _lote
    ) public {
        require(!serieExiste[_numeroDeSerie], "Numero de serie ja registrado.");

        BateriaDefeituosa memory novaBateria = BateriaDefeituosa({
            tipo: _tipo,
            uso: _uso,
            numeroDeSerie: _numeroDeSerie,
            dataProd: _dataProd,
            lote: _lote
        });

        // Adiciona a nova struct ao array dinâmico
        baterias.push(novaBateria);

        // Atualiza os mapeamentos para busca rápida
        uint256 indice = baterias.length - 1;
        serieParaIndice[_numeroDeSerie] = indice;
        serieExiste[_numeroDeSerie] = true;

        emit BateriaRegistrada(_numeroDeSerie, _tipo, _uso);
    }

    // 5. Método Getter (Para Recuperar um Dado de Struct Individual)
    // Retorna todos os campos, incluindo o 'uso' como uint8 (como o enum é tratado internamente)
    function recuperarBateriaPorSerie(string memory _numeroDeSerie)
        public
        view
        returns (
            string memory tipo,
            UsoBateria uso,           // Retorna o tipo enum
            string memory numeroDeSerie,
            uint256 dataProd,
            string memory lote
        )
    {
        require(serieExiste[_numeroDeSerie], "Numero de serie nao encontrado.");

        uint256 indice = serieParaIndice[_numeroDeSerie];
        BateriaDefeituosa storage bateria = baterias[indice];

        return (
            bateria.tipo,
            bateria.uso,
            bateria.numeroDeSerie,
            bateria.dataProd,
            bateria.lote
        );
    }

    // Função auxiliar para retornar o uso como string (facilita para front-ends)
    function getUsoAsString(UsoBateria _uso) public pure returns (string memory) {
        if (_uso == UsoBateria.AUTOMOTIVO) {
            return "Automotivo";
        }
        if (_uso == UsoBateria.NAUTICO) {
            return "Nautico";
        }
        if (_uso == UsoBateria.INDUSTRIAL) {
            return "Industrial";
        }
        return "Desconhecido"; // Nunca deve acontecer
    }

    // 6. Função Listar (Retorna todos os números de série)
    function listarSeries() public view returns (string[] memory) {
        uint256 total = baterias.length;
        string[] memory series = new string[](total);

        for (uint256 i = 0; i < total; i++) {
            series[i] = baterias[i].numeroDeSerie;
        }

        return series;
    }
}