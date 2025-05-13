package com.Uniquindio.redsocialeducativa.util.arbol;

public class ProbarGrafo {
    public static void main(String[] args) {

        ArbolBinario<Integer> arbol = new ArbolBinario<>();

        arbol.agregarDato(50);
        arbol.agregarDato(30);
        arbol.agregarDato(70);
        arbol.agregarDato(20);
        arbol.agregarDato(40);
        arbol.agregarDato(60);
        arbol.agregarDato(80);
        /*arbol.agregarDato(90);
        arbol.agregarDato(85);
        arbol.agregarDato(95);*/

        arbol.imprimirArbolForma();

        System.out.println("¿El dato existe? " + arbol.existeDato(80));
        System.out.println("La altura del árbol es de: " + arbol.getAltura());
        System.out.println("El peso del árbol es de: " + arbol.getPeso());
        System.out.println("La cantidad de hojas del árbol es de: "+ arbol.contarHojas());
        System.out.println("El nodo mayor del árbol es de: "+ arbol.getNodoMayor());
        System.out.println("El nodo menor del árbol es de: "+ arbol.getNodoMenor());

        arbol.recorrerInorden();
        arbol.recorrerPreorden();
        arbol.recorrerPostorden();

        arbol.eliminarDato(30);

        arbol.imprimirArbolForma();
    }
}
