// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Registro de Baterias Premium Defeituosas - Moura
 * @author Boris
 * @notice Contrato inteligente para armazenar e listar baterias defeituosas
 * @dev Usa struct, array dinâmico e funções setter/getter conforme solicitado.
 */
contract BateriasDefeituosasMoura {

    // Estrutura que representa uma bateria defeituosa
    struct Bateria {
        string tipo;        // Ex: "Moura Clean 70Ah"
        string uso;         // Ex: "Automotivo", "Náutico", "Industrial"
        string numeroSerie; // Ex: "AB1234XYZ"
        string dataProd;    // Ex: "2025-10-22"
        string lote;        // Ex: "Lote-45B"
    }

    // Array dinâmico para armazenar todas as baterias registradas
    Bateria[] private baterias;

    // Evento emitido sempre que uma bateria é registrada
    event BateriaRegistrada(
        uint256 indexed id,
        string tipo,
        string uso,
        string numeroSerie,
        string dataProd,
        string lote,
        address indexed registradoPor
    );

    /**
     * @dev Função para registrar uma nova bateria defeituosa
     * @param _tipo Tipo ou modelo da bateria
     * @param _uso Tipo de uso (Automotivo, Náutico, Industrial)
     * @param _numeroSerie Número de série da bateria
     * @param _dataProd Data de produção
     * @param _lote Código do lote de fabricação
     */
    function registrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _numeroSerie,
        string memory _dataProd,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria({
            tipo: _tipo,
            uso: _uso,
            numeroSerie: _numeroSerie,
            dataProd: _dataProd,
            lote: _lote
        });

        baterias.push(novaBateria);

        emit BateriaRegistrada(
            baterias.length - 1,
            _tipo,
            _uso,
            _numeroSerie,
            _dataProd,
            _lote,
            msg.sender
        );
    }

    /**
     * @dev Retorna uma bateria pelo índice no array
     * @param _index Índice da bateria (começa em 0)
     */
    function getBateria(uint256 _index)
        public
        view
        returns (
            string memory tipo,
            string memory uso,
            string memory numeroSerie,
            string memory dataProd,
            string memory lote
        )
    {
        require(_index < baterias.length, "Indice invalido");
        Bateria storage b = baterias[_index];
        return (b.tipo, b.uso, b.numeroSerie, b.dataProd, b.lote);
    }

    /**
     * @dev Lista todas as baterias registradas (retorna um array completo)
     */
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }

    /**
     * @dev Retorna o número total de baterias registradas
     */
    function totalBaterias() public view returns (uint256) {
        return baterias.length;
    }
}
