/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

export const recursos = {
    ResolucionDeProblemas: [
      {
        subtematica: "Pasos para la resolución de problemas",
        url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/"
      }
      // Aquí puedes añadir más recursos...
    ],
    Álgebra: [
      {
        subtematica: "Traducción de enunciados",
        url: "https://h5p.org/h5p/embed/131374"
      },
        {
            subtematica: "Operaciones algebraicas",
            url: "https://h5p.org/h5p/embed/131374"
        },
        {
            subtematica: "Ecuaciones de segundo grado",
            url: "https://unisallevirtual.lasalle.edu.co/mod/hvp/embed.php?id=1766793"
        },
        {
            subtematica: "Factorización",
            url: "https://h5p.org/h5p/embed/135794"
        },
        {
            subtematica: "Expresiones racionales",
            url: "https://h5p.org/h5p/embed/136846"
        },

      // Aquí puedes añadir más recursos...
    ],
    Ecuaciones: [
      {
        subtematica: "Ecuaciones Lineales",
        url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_EL_APP5/OVA_Ecuaciones_Lineales_V2/"
      },
      {
        subtematica: "Ecuaciones Cuadráticas",
        url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_EC_APP7/OVA_EC_APP/"
      },
      {
        subtematica: "Inecuaciones Lineales y cuadraticas",
        url: "https://h5p.org/h5p/embed/220693"
      }
    ],
    Geometría: [
      {
        subtematica: "Áreas y Volúmenes",
        url: "https://drive.google.com/file/d/10Xx_scheSiMvdZzWwVYWywBrNRADtoZ6/view?usp=sharing"
      },
    ],
    Funciones: [
      {
        subtematica: "Introducción a las funciones",
        url: "https://www.youtube.com/watch?v=-UPzQwTQhAU"
      },
        {
            subtematica: "Concepto de funcion - Evaluacion de funciones, dominio, rango y grafica",
            url: "https://h5p.org/h5p/embed/1465798"
        },
        {
            subtematica: "Tipos de funciones(funcion cuadratica y funcion lineal)",
            url: "https://h5p.org/h5p/embed/244800"
        },
        {
            subtematica: "Funciones exponenciales",
            url: "https://h5p.org/h5p/embed/349538"
        },

    ],
        Derivadas: [
            {
                subtematica: "Definicion de la derivada - La derivada como razon de cambio",
                url: "https://view.genial.ly/5d8387fa7d6fa60fcf658f94"
            },
            {
                subtematica: "Ejemplo de razon de cambio",
                url: "https://www.youtube.com/watch?v=D5hBaWuHRGQ"
            },
            {
                subtematica: "Reglas de derivacion",
                url: "https://view.genial.ly/5d6d7ca539c592100c2d71fd"
            },
            {
                subtematica: "Ejemplo de reglas de derivacion",
                url: "https://www.youtube.com/watch?v=gl9oK_LVPow"
            },
            {
                subtematica: "Derivadas de funciones exponentes y logaritmicas",
                url: "https://h5p.org/h5p/embed/1465796"
            },
            {
                subtematica: "Regla de la cadena",
                url: "https://drive.google.com/file/d/1iKkEUAlG55TNTlzYQ5qAIWQXt1OBkQgv/view?usp=sharing"
            },
            {
                subtematica: "Ejemplo 1 de regla de la cadena",
                url: "https://www.youtube.com/watch?v=cSpbZpIZrcM"
            },
            {
                subtematica: "Ejemplo 2 razón de cambio",
                url: "https://drive.google.com/file/d/17mUip9XYdjUBO02LbdtTYXXahhoKpDVR/view?usp=sharing"
            },
            {
                subtematica: "Máximos y mínimos",
                url: "https://drive.google.com/file/d/1Jtv0g2NSgsnac35AMC8bxREeRDBLh5qh/view?usp=sharing"
            },
            {
                subtematica: "Criterio de la primera derivada",
                url: "https://drive.https://drive.google.com/file/d/1mns5u6TVmj5pV0AQBKjH8OwBC9ZAl4md/view?usp=sharing.com/file/d/1mns5u6TVmj5pV0AQBKjH8OwBC9ZAl4md/view?usp=sharin"
            },
            {
                subtematica: "Derivadas de orden superior",
                url: "https://drive.google.com/file/d/1wcKlSdxgE8RlvpPeSffDgKFuO32sRszn/view?usp=sharing"
            },
            {
                subtematica: "Criterio de la segunda derivada",
                url: "https://drive.google.com/file/d/1sHFC150lWG3ZQ_5Kgiq1e_7H_ay_aYqX/view?usp=sharing"
            },

        ],

  };

const Recordemos = () => {
    const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (category:any) => {
    setExpandedSections(prev => ({
        ...prev,
        [category]: !prev[category]
    }));
};

    const openResource = (url: string) => {
        // Aquí puedes decidir cómo quieres abrir el recurso (WebView, Linking, etc.)
        Linking.openURL(url).catch((err) => console.error("No se pudo abrir el recurso", err));
      };
    
      const renderResources = (category) => {
        return recursos[category].map((recurso, index) => (
            <TouchableOpacity key={index} style={styles.subSection} onPress={() => openResource(recurso.url)}>
                <Text>{recurso.subtematica}</Text>
            </TouchableOpacity>
        ));
    };
  return (
    <ScrollView style={styles.container}>
         <View style={{ flexDirection: 'row', alignItems: 'center', ...styles.header }}>
        <Text style={styles.headerText}>Recordemos</Text>
        <Ionicons name="trophy" size={24} color="black" />
    </View>
    {/* Iterar sobre cada categoría */}
    {Object.keys(recursos).map((category, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.funBackground}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(category)}>
            <Text style={styles.sectionTitle}>{category.replace(/([A-Z])/g, ' $1').trim()}</Text>
            {/* Agregar ícono de Chevron que cambia con el estado */}
            <Ionicons
                name={expandedSections[category] ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={24}
                color="black"
            />
        </TouchableOpacity>
        {/* Solo mostrar recursos si la sección está expandida */}
        {expandedSections[category] && renderResources(category)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressText: {
    fontSize: 14,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginHorizontal: 16,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '25%',
    backgroundColor: '#4ADE80',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  funBackground: {
    padding: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FDE047',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1F2937',
    fontWeight: 'bold',
  },
  subSection: {
    backgroundColor: '#FCD34D',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Recordemos;
