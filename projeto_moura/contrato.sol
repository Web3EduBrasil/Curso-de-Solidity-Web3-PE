// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RegistroBateriasMouraV3 - Versão Aberta
 * @dev Versao 3: Adiciona novos tipos de uso e uma funcao para remover baterias.
 * @notice NESTA VERSÃO: As funções registrarBateria e removerBateria foram abertas para qualquer endereço.
 */
contract RegistroBateriasMouraV3_Aberto { // Renomeado para clareza

    // O owner ainda é rastreado, mas não usado para restringir as funções principais
    address public owner;

    enum TipoUso {
        Automotivo,   // 0
        Nautico,      // 1
        Industrial,   // 2
        Estacionaria, // 3
        Acumulador    // 4
    }

    struct BateriaDefeituosa {
        uint256 id;
        string tipo;
        TipoUso uso;
        string serialNumber;
        uint256 dataProducao;
        string lote;
        uint256 dataRegistro;
    }

    BateriaDefeituosa[] public listaBateriasDefeituosas;

    event BateriaRegistrada(
        uint256 indexed id,
        string serialNumber,
        string tipo,
        TipoUso uso
    );

    event BateriaRemovida(
        uint256 indexed idRemovido,
        string serialNumber
    );

    // O modificador onlyOwner não é mais necessário para as funções principais
    // Poderia ser removido completamente se não fosse usado em nenhuma outra função futura.
    /*
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }
    */

    constructor() {
        owner = msg.sender; // Define o owner original (pode ser útil para referência)
    }

    // --- Funcao Setter (MODIFICADA: sem onlyOwner) ---
    function registrarBateria(
        string memory _tipo,
        TipoUso _uso,
        string memory _serialNumber,
        uint256 _dataProducao,
        string memory _lote
    ) public { // <<<--- MODIFICADO: onlyOwner removido

        uint256 novoId = listaBateriasDefeituosas.length;

        BateriaDefeituosa memory novaBateria = BateriaDefeituosa({
            id: novoId,
            tipo: _tipo,
            uso: _uso,
            serialNumber: _serialNumber,
            dataProducao: _dataProducao,
            lote: _lote,
            dataRegistro: block.timestamp
        });

        listaBateriasDefeituosas.push(novaBateria);

        emit BateriaRegistrada(novoId, _serialNumber, _tipo, _uso);
    }

    // --- Funcao de Remocao (MODIFICADA: sem onlyOwner) ---
    /**
     * @dev Remove uma bateria da lista pelo seu numero de serie.
     * Utiliza o metodo "Swap and Pop". CUIDADO: Altera a ordem da lista.
     * @notice NESTA VERSÃO: Qualquer endereço pode chamar esta função.
     * @param _serialNumber O numero de serie da bateria a ser removida.
     */
    function removerBateria(string memory _serialNumber) public { // <<<--- MODIFICADO: onlyOwner removido

        int256 indexParaRemover = -1;
        for (uint256 i = 0; i < listaBateriasDefeituosas.length; i++) {
            if (keccak256(abi.encodePacked(listaBateriasDefeituosas[i].serialNumber)) == keccak256(abi.encodePacked(_serialNumber))) {
                indexParaRemover = int256(i);
                break;
            }
        }

        require(indexParaRemover != -1, "Bateria com este serial nao encontrada");

        uint256 index = uint256(indexParaRemover);
        uint256 ultimoIndex = listaBateriasDefeituosas.length - 1;

        uint256 idRemovido = listaBateriasDefeituosas[index].id;
        string memory serialRemovido = listaBateriasDefeituosas[index].serialNumber;

        if (index != ultimoIndex) {
            listaBateriasDefeituosas[index] = listaBateriasDefeituosas[ultimoIndex];
            listaBateriasDefeituosas[index].id = index; // Atualiza o ID do item movido
        }

        listaBateriasDefeituosas.pop();

        emit BateriaRemovida(idRemovido, serialRemovido);
    }


    // --- Funcoes Getter (sem alteracoes) ---

    function getBateria(uint256 _id) public view returns (BateriaDefeituosa memory) {
        require(_id < listaBateriasDefeituosas.length, "ID de bateria invalido");
        return listaBateriasDefeituosas[_id];
    }

    function listarBaterias() public view returns (BateriaDefeituosa[] memory) {
        return listaBateriasDefeituosas;
    }

    function getContagemTotal() public view returns (uint256) {
        return listaBateriasDefeituosas.length;
    }
}