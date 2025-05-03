<%--
/*
• This piece of information is originated by and the intellectual property of Esri China (Hong Kong) Limited.
• Name of Code Originator: Esri's team
• Creation Date: 3 March 2022
• Description/Purpose: server ip checking
• Required Inputs: N/A
• Expected Outputs: server ip
• Description of Modification: removing obsoleted code
• Modification Date: 20 September 2022
• Modified By: Esri's team
 */
 --%>
<%
Response.Write(Request.ServerVariables("REMOTE_ADDR"))
%>
