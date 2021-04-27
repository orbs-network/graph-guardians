import { BigInt, Bytes, store } from '@graphprotocol/graph-ts';
import { GuardianRegistered, GuardianUnregistered, GuardianDataUpdated} from '../generated/Guardians/GuardiansRegistration'
import { CommitteeChange } from '../generated/Committee/Committee'
import { GuardianCertificationUpdate } from '../generated/Certification/Certification'
import { Guardian } from '../generated/schema'

export function handleGuardianRegistered(event: GuardianRegistered): void {
  let guardian = new Guardian(event.params.guardian.toHex());
  initGuardian(guardian);
  guardian.registeredBlockNumber = event.block.number;
  guardian.registeredTimestamp = event.block.timestamp;
  guardian.save()
}

export function handleGuardianUnregistered(event: GuardianUnregistered): void {
  let id = event.params.guardian.toHex()
  let guardian = Guardian.load(id)
  if (guardian == null) {
    return; // ignore nothing to do
  }
  store.remove('Guardian', id)
}

export function handleGuardianDataUpdated(event: GuardianDataUpdated): void {
  let id = event.params.guardian.toHex()
  let guardian = Guardian.load(id)
  if (guardian == null) {
    let guardian2 = new Guardian(id);
    initGuardian(guardian2);
    guardian = guardian2
  }
  guardian.ip = getIpFromBytes(event.params.ip);
  guardian.orbsAddress = event.params.orbsAddr.toHex();
  guardian.name = event.params.name;
  guardian.website = event.params.website;
  guardian.save()
}

export function handleCommitteeChange(event: CommitteeChange): void {
  let id = event.params.addr.toHex()
  let guardian = Guardian.load(id)
  if (guardian == null) {
    return; // ignore nothing to do
  }
  guardian.isInCommittee = event.params.inCommittee;
  guardian.isCertified = event.params.certification;
  guardian.weight = event.params.weight;
  guardian.save();  
}

export function handleGuardianCertificationUpdate(event: GuardianCertificationUpdate): void {
  let id = event.params.guardian.toHex()
  let guardian = Guardian.load(id)
  if (guardian == null) {
    return; // ignore nothing to do
  }
  guardian.isCertified = event.params.isCertified;
  guardian.save();  
}

// Helper funcs
function initGuardian(guardian: Guardian): void {
  guardian.ethAddress = guardian.id;
  guardian.isInCommittee = false;
  guardian.isCertified = false;
  guardian.weight = BigInt.fromI32(0);
}

let ff = BigInt.fromI32(255);
function byte(value: BigInt, byteIdx: number): string {
  let shift = u8(byteIdx * 8);
  return value.bitAnd(ff.leftShift(shift)).rightShift(shift).bitAnd(ff).toString()
}

export function getIpFromBytes(ipStr: Bytes): string {
  let n = BigInt.fromUnsignedBytes(ipStr)
  return byte(n, 0) + '.' + byte(n, 1) + '.' + byte(n, 2) + '.' + byte(n, 3);
}