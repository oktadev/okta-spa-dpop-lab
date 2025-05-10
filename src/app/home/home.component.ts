import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="space-y-8">
      <p class="text-2xl">Welcome to the Demonstrating Proof of Possession (DPoP) lab.</p>
      <p>This lab demonstrates how DPoP protects against unauthorized access token use. We will call Okta's APIs to show the protection mechanisms and verification handshake when request sensitive resources.</p>
      <p>
        If you found this workshop interesting, check out
        <a class="underline text-blue-600" href="https://developer.okta.com/blog/2024/10/23/dpop-oauth-node">How to Build Secure Okta Node.js Integrations with DPoP</a>.
      </p>
      <div>
      <p>We have some awesome resources to help you on your identity learning journey!</p>
        <ul role="list" class="mt-2 list-inside list-disc">
          <li>Be sure to check out the <a class="underline text-blue-600" href="https://developer.okta.com/blog/">Okta Developer blog </a></li>
          <li>Prefer videos? Check out the <a class="underline text-blue-600" href="https://www.youtube.com/c/OktaDev/">Okta Developer YouTube channel</a></li>
          <li>Learn more about Okta at <a class="text-blue-600" href="https://developer.okta.com">developer.okta.com</a></li>
        </ul>
      </div>
    </div>
  `
})
export class HomeComponent {

}
