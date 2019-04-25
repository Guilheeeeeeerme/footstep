FROM maven:3.6-jdk-8

WORKDIR /var/lib/evccollect

COPY . .

RUN mvn clean install

WORKDIR /var/lib

ADD http://mirror.nbtelecom.com.br/apache/tomcat/tomcat-7/v7.0.94/bin/apache-tomcat-7.0.94.zip tomcat.zip
RUN unzip tomcat.zip

RUN mv ./apache-tomcat-7.0.94 ./tomcat

ENV CATALINA_HOME=/var/lib/tomcat

RUN rm -rf $CATALINA_HOME/webapps/**

RUN cp /var/lib/evccollect/target/*.war $CATALINA_HOME/webapps/

RUN chmod a+x $CATALINA_HOME/bin/catalina.sh

EXPOSE 8080

CMD ["/var/lib/tomcat/bin/catalina.sh", "run"]
# CMD bash
