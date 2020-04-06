import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import * as MailerComposer from 'expo-mail-composer'; 



import logo from '../../assets/logo.png';
import styles from './styles'

export default function(){
    const navigation = useNavigation();
    const route = useRoute();
    
    const incident = route.params.incident;
    console.log(incident);
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: " ${incident.title}" com o valor de "${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}".`;
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailerComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ["roger.donegati@gmail.com "],
            // recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsApp(){
        const customMessage = 'O loco, realmente fiquei deslumbrada com essa aplicação deveras supreendente, muito bom, mandou bem demais!!!!'
        Linking.openURL(`whatsapp://send?phone=+5511948070347&text=${customMessage}`);
        // Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${customMessage}`);
    }

    return(
        <View  style={styles.container}>
            <View  style={styles.header}>
                <Image source={logo}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="E02041"/> 
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}, {incident.uf}.</Text>  

                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>  

                
                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL'}).format(incident.value)}
                </Text> 
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>  
                <Text style={styles.heroDescription}>Entre em contato.</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}