---
sidebar_position: 6
title: Mikrotik RouterOS
description: Create & manage RouterOS network infrastructure using IaaS with OpenTofu / Terraform
tags: [opentofu, terraform, mikrotik, routeros]
---

# Create & manage RouterOS network infrastructure using IaaS with OpenTofu

:::tip Disclaimer
This post was originally posted on [emerconnelly.com](https://emerconnelly.com/mikrotik/routeros/terraform/terraform-create-manage-routeros-network-infrastructure/). All credit goes to Emer Connelly for the original work. I modified the steps for OpenTofu and simplified it down to the minimal required steps to get my own setup going.
:::

This post covers how to create & manage networking infrastructure in RouterOS using IaaS with OpenTofu. Most of this will also work for the now closed-source Terraform, but for the most part I will refer to it as OpenTofu.


## Prerequisites
### Enable RouterOS’ REST API
Before OpenTofu can access RouterOS, we need to open up its REST API. This involves a couple steps – creating two self-signed certificates & enabling the www-ssl service. If necessary, refer to RouterOS’ REST API docs.

You can also read the documentation for either [Terraform](https://developer.hashicorp.com/terraform/downloads) or [OpenTofu](https://opentofu.org/docs/intro/install/) on this process.

:::note NOTE
The REST API requires RouterOS v7.1beta4 or newer.
:::

### Certificates
Two certificates are required to enable the www-ssl service – root & HTTPS. If necessary, refer to [RouterOS’ certificate docs](https://help.mikrotik.com/docs/display/ROS/Certificates).

SSH into your router. Open the certificates menu with /certificate.

```
> /certificate
/certificate> 
```
Now let’s create the certificate templates.
```
/certificate> add name=root-cert common-name=root-cert key-usage=key-cert-sign,crl-sign
/certificate> add name=https-cert common-name=https-cert
```
Before signing, let’s check our work with print detail.
```
/certificate> print detail
Flags: K - private-key, L - crl, C - smart-card-key, A - authority, I - issued, R - revoked, E - expired, T - trusted
 0         name="root-cert" key-type=rsa common-name="root-cert" key-size=2048 subject-alt-name="" days-valid=365
           key-usage=key-cert-sign,crl-sign
           fingerprint="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" akid="" skid=""

 1         name="https-cert" key-type=rsa common-name="https-cert" key-size=2048 subject-alt-name="" days-valid=365
           key-usage=digital-signature,key-encipherment,data-encipherment,key-cert-sign,crl-sign,tls-server,tls-client
           akid="" skid=""
```
Notice the default days-valid is 365. If you want a longer or shorter expiration date, this number can be modified.

Next step is signing our new certificates. Each signing will take a few seconds.
```
/certificate> sign root-cert
  progress: done

/certificate> sign https-cert
  progress: done

/certificate>
```
[RouterOS documentation](https://help.mikrotik.com/docs/display/ROS/Certificates)

#### www-ssl
Now we can enable the www-ssl service and configure it with a cert.

Open the `/ip service` menu and configure away.
```
certificate> /ip service
/ip service> set www-ssl certificate=https-cert disabled=no
```
Optionally (but recommended), disable www, which is the HTTP service.
```
/ip service> set www disabled=yes
```

## OpenTofu Setup
If you haven’t already installed Terraform or OpenTofu, follow the steps for [Terraform](https://developer.hashicorp.com/terraform/downloads) or [OpenTofu](https://opentofu.org/docs/intro/install/).

### Provider documentation
The provider documentation can be found here: [RouterOS Provider](https://registry.terraform.io/providers/terraform-routeros/routeros/latest/docs).

### Environment setup
Create a directory to host your OpenTofu environment. All related OpenTofu files will be created and saved here.

Create a new empty file called main.tf. This will be our primary OpenTofu template.

Using the Provider
To use the RouterOS provider and configure access to your router, add the following to main.tf
```
terraform {
  required_providers {
    routeros = {
      source = "terraform-routeros/routeros"
    }
  }
}

provider "routeros" {
  hosturl  = "https://127.0.0.1"
  username = "admin"
  password = "password"
  insecure = true
}
```
Replace hosturl with your router’s IP address, and username & password with your credentials. Configuring insecure = true is required because our RouterOS certificate is self-signed.

:::warning WARNING
Saving credentials in plaintext is insecure and dangerous. This example is simplified as managing OpenTofu secrets is out of the scope of this post. Further reading can be found [here](https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1).
:::


### Initialization
Now we are ready to initialize, which creates all the necessary OpenTofu configuration files inside of our working directory, by using `tofu init`.
```
$ tofu init

Initializing the backend...

Initializing provider plugins...
- Finding latest version of terraform-routeros/routeros...
- Installing terraform-routeros/routeros v1.4.6...
- Installed terraform-routeros/routeros v1.4.6

(...)

Terraform has been successfully initialized!

(...)
```
Notice the newly create directory and files. These are automatically created upon initialization.



